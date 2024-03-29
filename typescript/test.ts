function main() {
    const cells: ICell[] = [];

    for (let index = 0; index < 64; index++) {
        cells.push({
            cellType: {},
            landable: true,
            name: 'test',
        });
    }
    const map = new SimpleMap(8, 8, cells);
    drawMask(map, new Position(3, 3), squareRangeMask);
}

interface Point {
    x: number,
    y: number,
}

enum Direction {
    left, right, up, down
}

class Position implements Position {
    private _x: number;
    private _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    public get x(): number {
        return this._x;
    }

    public set x(value: number) {
        this._x = value;
    }

    public get y(): number {
        return this._y;
    }

    public set y(value: number) {
        this._y = value;
    }

    public equals(pos: Position) {
        return this.x === pos.x && this.y === pos.y;
    }
}

interface CellType { }

interface ICell {
    name: string,
    cellType: CellType,
    pos?: Position,
    landable: boolean,
}

interface IncountUnit {
    id: string;
    teamId: string;
    pos: Position;
    maxMoveCount: number;
    currentMoveCount: number;
    canAcion: boolean;
    direction: Direction;
}

interface IMap {
    getCell(pos: Position): ICell | null,
    setCell(x: number, y: number, cell: ICell): Position | null,
    getWidth(): number,
    getHeight(): number,
    getSize(): number,
}

class Incount {
    private map: IMap;
    private units: IncountUnit[];

    private isRunning = false;

    private teamIdHasTurn: string | null = null;
    private unitHasAction: IncountUnit | null = null;

    private turnCount = 0;

    private eventListener = [];

    constructor(map: IMap, units: IncountUnit[]) {
        this.map = map;
        this.units = units;
    }

    public start() {
        this.isRunning = true;
    }

    public getUnit(pos: Position): IncountUnit | undefined {
        const candidates = this.units.filter(unit => unit.pos.equals(pos));
        return candidates.length > 0 ? candidates[0] : undefined;
    }

    public moveUnit(unit: IncountUnit, pos: Position): boolean {
        const cell = this.map.getCell(pos);
        if (!cell) {
            return false;
        }

        if (!cell.landable) {
            return false;
        }

        unit.pos = pos;
        return true;
    }

    public endCurrentTeamTurn() {
        this.teamIdHasTurn = null;//this.getNextTurnTeamId();

        this.units.forEach(unit => {
            if (unit.teamId === this.teamIdHasTurn) {
                unit.canAcion = true;
                unit.currentMoveCount = unit.maxMoveCount;
            } else {
                unit.canAcion = false;
            }
        });

        this.turnCount++;
    }

    public endAction() {
        if (this.unitHasAction) {
            this.unitHasAction.canAcion = false;
        }
    }

    public selectUnitForAction(unit: IncountUnit): boolean {
        if (unit.teamId !== this.teamIdHasTurn) {
            return false;
        }

        if (!unit.canAcion) {
            return false;
        }

        this.unitHasAction = unit;

        return true;
    }

    public getMovableCells(unit: IncountUnit): ICell[] {
        if (!unit) {
            return [];
        }
        return [];
    }
}

interface Command {
    selectTargetMask: MaskArea;
    effectPointMask: MaskArea;
}

interface MaskArea {
    points: Point[]
}

const cross1RangeMaskArea: MaskArea = Object.freeze({
    points: [
        { x: -1, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
        { x: 0, y: 1 },
    ]
});

const squareRangeMask: MaskArea = Object.freeze({
    points: [
        { x: -1, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
        { x: 0, y: 1 },
        { x: -1, y: -1 },
        { x: 1, y: 1 },
        { x: -1, y: 1 },
        { x: 1, y: -1 },
    ]
});

const square2RangeMask: MaskArea = Object.freeze({
    points: [
        { x: -2, y: 0 },
        { x: 2, y: 0 },
        { x: 0, y: -2 },
        { x: 0, y: 2 },
        { x: -1, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
        { x: 0, y: 1 },
        { x: -1, y: -1 },
        { x: 1, y: 1 },
        { x: -1, y: 1 },
        { x: 1, y: -1 },
    ]
});

const acc2RangedMaskArea: MaskArea = {
    points: [
        { x: -2, y: 0 },
        { x: 2, y: 0 },
        { x: 0, y: -2 },
        { x: 0, y: 2 },
        { x: -1, y: -1 },
        { x: 1, y: 1 },
        { x: -1, y: 1 },
        { x: 1, y: -1 },
    ]
}

class SimpleMap implements IMap {
    width: number;
    height: number;
    cells: ICell[];

    constructor(width: number, height: number, cells: ICell[]) {
        this.width = width;
        this.height = height;
        this.cells = cells;
    }

    setCell(x: number, y: number, cell: ICell): Position | null {
        if (this.cells.length - 1 < x * y) {
            return null;
        }

        this.cells[x * y] = cell;

        return new Position(x, y)
    }

    getCell(pos: Position): ICell | null {
        if (pos.x < 0 || pos.y < 0) {
            return null;
        }

        return this.cells.at(pos.x * pos.y) || null;
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }

    getSize(): number {
        return this.width * this.height;
    }
}

function drawMapInConsole(map: IMap) {
    let data = "";
    for (let h = 0; h < map.getHeight(); h++) {
        for (let w = 0; w < map.getWidth(); w++) {
            const cell = map.getCell(new Position(w, h));
            data += 'ㅁ';
        }
        data += '\n';
    }
    console.log(data);
}

function getMaskPositions(stand: Position, mask: MaskArea): Position[] {
    return mask.points.map(item => {
        return new Position(
            stand.x + item.x,
            stand.y + item.y
        )
    })
}

function drawMask(map: IMap, position: Position, mask: MaskArea) {
    let data = "";
    let maskPositions = getMaskPositions(position, mask);
    for (let h = 0; h < map.getHeight(); h++) {
        for (let w = 0; w < map.getWidth(); w++) {
            const cell = map.getCell(new Position(w, h));

            const isMask = maskPositions.some(maskPosition => {
                return maskPosition.equals(new Position(w, h));
            });

            if (isMask) {
                data += 'ㅎ';
            } else {
                data += 'ㅁ';
            }
        }
        data += '\n';
    }
    console.log(data);
}

main();