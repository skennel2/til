import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';

const filePath = '/Users/yunsuna/workspace/orbit/MarkdownMaker/test.ts'
// const filePath = '/Users/yunsuna/workspace/orbit/luna-orbit/src/components/OBTLinearProgress/OBTLinearProgress.tsx'

type JsDocParseResult = {
    name: string,
    kind: string,
    jsDoc: string,
    tags: string[],
    parent: {
        name: string,
    } | null,
    sourceCode: string,
}

function getNodeDeclarationType(node: ts.Node) {
    if (ts.isFunctionDeclaration(node)) {
        return 'FunctionDeclaration';
    } else if (ts.isMethodDeclaration(node)) {
        return 'MethodDeclaration';
    } else if (ts.isClassDeclaration(node)) {
        return 'ClassDeclaration';
    } else if (ts.isEnumDeclaration(node)) {
        return 'EnumDeclaration';
    } else if (ts.isEnumMember(node)) {
        return 'EnumMember';
    } else if (ts.isPropertyDeclaration(node)) {
        return 'PropertyDeclaration';
    } else if (ts.isConstructorDeclaration(node)) {
        return 'ConstructorDeclaration';
    } else if (ts.isInterfaceDeclaration(node)) {
        return 'InterfaceDeclaration';
    } else if (ts.isVariableDeclaration(node)) {
        return 'InterfaceDeclaration';
    } else if (ts.isPropertySignature(node)) {
        return 'PropertySignature';
    } else {
        return null;
    }
}

type NodeParseResult = {
    sourceFile: string,
    node: {
        name: string,
        type: string,
        data: {
            parameters?: {
                name: string,
                optional: boolean,
                type: string | null,
            }[]
            returnType?: string | null
        }
    }
    parent?: {
        name: string,
        sourceFile: string,
    },
    jsDoc: {
        text: string[]
    }
}

class NodeParseResultBuilder {

}

function parseJSDoc2(node: ts.Node, checker: ts.TypeChecker) {
    const result: NodeParseResult[] = []

    const jsDocs = ts.getJSDocCommentsAndTags(node);
    if (jsDocs.length > 0) {

        // jsDoc이 달린 노드에 대한 분석 

        // method
        if (ts.isMethodDeclaration(node)) {
            const resultItem: NodeParseResult = {
                sourceFile: node.getSourceFile().fileName,
                node: {
                    name: node.name.getText(),
                    type: 'method',
                    data: {
                        parameters: node.parameters ? node.parameters.map(parameter => {
                            return {
                                name: parameter.name.getText(),
                                optional: parameter.questionToken ? true : false,
                                type: parameter.type ? parameter.type.getText() : null
                            }
                        }) : [],
                        returnType: (() => {
                            if (node.type) {
                                return node.type.getText();
                            } else {
                                const signature = checker.getSignatureFromDeclaration(node);
                                if (signature) {
                                    const returnType = checker.getReturnTypeOfSignature(signature);
                                    return checker.typeToString(returnType);
                                }
                            }
                        })()
                    }
                },
                parent: (() => {
                    let parentNode: any = null;
                    if (getNodeDeclarationType(node.parent)) {
                        let name = (node.parent as any)['name'] as any;
                        if (name) {
                            parentNode = name.getText()
                        }
                    }

                    return {
                        name: parentNode,
                        sourceFile: node.parent.getSourceFile().fileName
                    }
                })(),
                jsDoc: {
                    text: jsDocs.map(doc => doc.getFullText())
                }
            }
            result.push(resultItem)
        }

        // jsDoc이 달린 노드의 부모 대한 분석 

    }

    ts.forEachChild(node, (child) => {
        result.push(...parseJSDoc2(child, checker));
    });

    return result;
}

function parseJSDoc(node: ts.Node): JsDocParseResult[] {
    const comments: JsDocParseResult[] = [];

    const jsDocs = ts.getJSDocCommentsAndTags(node);
    if (jsDocs.length > 0) {
        if (ts.isFunctionDeclaration(node)
            || ts.isMethodDeclaration(node)
            || ts.isClassDeclaration(node)
            || ts.isEnumDeclaration(node)
            || ts.isEnumMember(node)
            || ts.isPropertyDeclaration(node)
            || ts.isConstructorDeclaration(node)
            || ts.isInterfaceDeclaration(node)
            || ts.isPropertySignature(node)) {

            const nodeName = node.name ? node.name.getText() : null;

            // parent 분석
            let parentNode: any = null;
            if (getNodeDeclarationType(node.parent)) {
                let name = (node.parent as any)['name'] as any;
                if (name) {
                    parentNode = name.getText()
                }
            }

            const extendsList: string[] | null = null;
            if (ts.isInterfaceDeclaration(node)) {
                if (node.heritageClauses) {
                    for (const clause of node.heritageClauses) {
                        if (clause.token === ts.SyntaxKind.ExtendsKeyword) {
                            for (const parent of clause.types) {
                                extendsList
                            }
                        }
                    }
                }
            }

            if (ts.isMethodDeclaration(node)) {
                if (node.parameters) {
                    for (const methodParameter of node.parameters) {
                        methodParameter.type

                    }
                }
            }

            // jsdoc 분석
            for (const doc of jsDocs) {
                if (ts.isJSDoc(doc)) {
                    // pass internal
                    if (doc.tags && doc.tags.find(tag => tag.tagName.getText() === 'internal')) {
                        continue;
                    }

                    comments.push({
                        name: nodeName || '',
                        kind: node.kind.toString(),
                        tags: (doc.tags || []).map(tag => {
                            return tag.tagName.getText()
                        }),
                        jsDoc: doc.getFullText(),
                        sourceCode: node.getText(),
                        parent: parentNode ? {
                            name: parentNode,
                        } : null
                    });
                }
            }
        }
    }

    ts.forEachChild(node, (child) => {
        const childParseResult = parseJSDoc(child);
        comments.push(...childParseResult);
    });
    return comments;
}

function formatAsMarkdown(jsDoc: JsDocParseResult[]): string {
    let markdown = '| Name | Kind | Tags | JsDoc | Source Code | Parent |\n';
    markdown += '|------|------|------|-------|-------------|--------|\n';

    jsDoc.forEach(item => {
        const name = item.name || '';
        const kind = item.kind || '';
        const tags = item.tags.length > 0 ? item.tags.join(', ') : '';
        const jsDoc = ''//item.jsDoc ? `\`\`\`js\n${item.jsDoc}\n\`\`\`` : '';
        const sourceCode = ''//item.sourceCode ? `\`\`\`ts\n${item.sourceCode}\n\`\`\`` : '';
        const parent = item.parent ? item.parent.name : 'null';

        markdown += `| ${name} | ${kind} | ${tags} | ${jsDoc} | ${sourceCode} | ${parent} |\n`;
    });

    return markdown;
}

function main() {
    const sourceFile = fs.readFileSync(filePath, 'utf-8');

    const tsSourceFile = ts.createSourceFile('test.ts', sourceFile, ts.ScriptTarget.ES2020, true, ts.ScriptKind.TSX);
    const program = ts.createProgram(['test.ts'], {

    });

    const checker = program.getTypeChecker();

    const jsdocComments = parseJSDoc(tsSourceFile);

    const result = parseJSDoc2(tsSourceFile, checker);
    fs.writeFileSync(path.resolve(__dirname, 'doc/output2.json'), JSON.stringify(result, null, 2), 'utf8');

    fs.writeFileSync(path.resolve(__dirname, 'doc/output.json'), JSON.stringify(jsdocComments, null, 2), 'utf8');
    console.log('json 생성완료: output.json');

    const markdown = formatAsMarkdown(jsdocComments);

    fs.writeFileSync(path.resolve(__dirname, 'doc/output.md'), markdown);
    console.log('마크다운 생성완료: output.md');
}

main();
