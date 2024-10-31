import readline from 'readline'

class Stack<T> {
    private items: T[] = [];

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    size(): number {
        return this.items.length;
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

interface MainData {
    numberValue?: number,
    stringValue?: string,
    ddd?: {
        val1?: string,
        val2?: string,
    }
}

class DataContainer<T extends Record<string, any>> {
    private data: T = {} as T;
    private dataChangeLog: {
        key: keyof T,
        value: T[keyof T],
        updateReason?: string,
        date: Date
    }[] = [];

    get Data(): Readonly<T> {
        return this.data;
    }

    changeData<K extends keyof T>(key: K, value: T[K], updateReason?: string) {
        this.data[key] = typeof value === 'object' ? {
            ...this.data[key],
            ...value
        } : value;
        this.dataChangeLog.push({
            key: key,
            value: value,
            updateReason: updateReason,
            date: new Date()
        })
    }
}

class EventContext {
    dataContainer: DataContainer<MainData>;
    scriptStack: Stack<ScriptType> = new Stack();
    playing = false;

    constructor(mainContext: DataContainer<MainData>) {
        this.dataContainer = mainContext;
    }

    addScript(script: ScriptType) {
        this.scriptStack.push(script);
    }

    async play() {
        if (this.playing) {
            throw Error('already plaing...');
        }
        this.playing = true;
        while (!this.scriptStack.isEmpty()) {
            const script = this.scriptStack.pop();
            if (script) {
                await playScript(this, script);
            }
        }
    }
}

type ScriptType = {
    scripts: (string | ScriptType)[],
    condition?: ((context: EventContext) => boolean),
    elseScripts?: ScriptType[],
    event?: ((context: EventContext) => boolean),
    select?: SelectType[]
};

type SelectType = {
    key: string,
    scripts?: ScriptType[],
    callback?: ((context: EventContext) => void)
}

const testScript = {
    scripts: [
        {
            scripts: [
                '페이지',
            ],
            event: (context: EventContext) => {
                context.addScript({
                    scripts: ['다음에 등장합니다.']
                })
            }
        },
        {
            condition: (context: EventContext) => {
                return true;
            },
            scripts: [
                '적용',
                '체크',
                '사원',
                {
                    scripts: [
                        '순번',
                        '해당'
                    ],
                    select: [{
                        key: '1',
                        callback: (context: EventContext) => {

                        },
                        scripts: [
                            '1을 선택1',
                            '1을 선택2',
                            '3을 선택2',
                            '4을 선택2',
                        ]
                    }, {
                        key: '2',
                        callback: (context: EventContext) => {
                            console.log('ffffffffffffffffffffffffffffff')
                            context.dataContainer.changeData('ddd', {
                                val1: '111',
                                val2: '222',
                            });
                            context.dataContainer.changeData('ddd', {
                                val1: 'aaa',
                            });

                        },
                        scripts: [
                            '1',
                            '2'
                        ]
                    }],
                }
            ]
        }
    ]
} as ScriptType;

async function playScript(context: EventContext, scripts: ScriptType) {
    const doPlayScript = async (script: ScriptType | string, scriptLine: string[]) => {
        if (typeof script === 'string') {
            await handleTextScript(script, scriptLine);
            return;
        }

        let childScripts = script.condition && !script.condition(context) ? script.elseScripts : script.scripts;
        if (childScripts) {
            for (const childScript of childScripts) {
                await doPlayScript(childScript, scriptLine);
            }
        }

        if (script.select && script.select.length > 0) {
            await handleSelection(script.select, context, scriptLine);
        } else {
            await pressAnyKey();
        }

        if (script.event) {
            handleEvent(script, context);
        }
    }

    const handleTextScript = async (line: string, scriptLine: string[]) => {
        printLine(line);
        scriptLine.push(line);
        if (scriptLine.length % 3 === 0) {
            await pressAnyKey();
        }
    }

    const handleSelection = async (selectOptions: SelectType[], context: EventContext, scriptLine: string[]) => {
        let wrongAnswer = true;
        while (wrongAnswer) {
            const answer = await question('select: ');

            let found = false;
            for (const select of selectOptions) {
                if (answer === select.key) {
                    if (select.callback) {
                        select.callback(context);
                    }

                    if (select.scripts) {
                        for (const selectScript of select.scripts) {
                            await doPlayScript(selectScript, scriptLine);
                        }
                    }

                    found = true;
                    wrongAnswer = false;
                    break;
                }
            }

            if (!found) {
                console.log("Invalid selection. Please try again.");
            }
        }
    }

    const handleEvent = (script: ScriptType, context: EventContext) => {
        if (typeof script !== 'string') {
            if (script.event) {
                script.event(context);
            }
        }
    }

    const scriptLine: string[] = [];
    await doPlayScript(scripts, scriptLine);
}

function printLine(...text: any[]) {
    console.log(...text)
}

function question(query: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(query, (answer) => {
            resolve(answer);
        });
    });
}

function pressAnyKey(): Promise<string> {
    return new Promise((resolve) => {
        rl.question('', (answer) => {
            resolve(answer);
        });
    });
}

async function start() {
    try {
        const context = new EventContext(new DataContainer<MainData>());
        context.addScript(testScript);

        await context.play();

        console.log(context.dataContainer.Data.ddd!.val1);
        console.log(context.dataContainer.Data.ddd!.val2);

    } catch (e) {
        console.error(e);
    } finally {
        rl.close();
    }
}

start()