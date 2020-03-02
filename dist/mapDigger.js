import { UUIDv4Generator } from './uuidv4.js';
import { Rng } from './Rng.js';
export class Tile {
    constructor() {
        this.backgroundColor = "#FFF";
        this.glyph = ".";
        this.color = "#000";
    }
}
export class MapDigger {
    static dig(map, worldW, worldH) {
        let rooms = [];
        for (let index = 0; index < 12; index++) {
            let room = new Room({
                width: Rng.generate(5, 10),
                height: Rng.generate(5, 10),
                x: Rng.generate(0, 29),
                y: Rng.generate(0, 29)
            });
            if (room.x + room.width > worldW || room.y + room.height > worldH) {
                continue;
            }
            if (rooms.length == 0) {
                rooms.push(room);
                for (let i = room.y; i < room.height + room.y; i++) {
                    for (let j = room.x; j < room.width + room.x; j++) {
                        map[i][j] = new Tile();
                    }
                }
                continue;
            }
            //cannot be placed algoritmo
            let cannotBePlaced = false;
            rooms.forEach(placedRoom => {
                if (room.intersectsWith(placedRoom)) {
                    cannotBePlaced = true;
                }
            });
            if (cannotBePlaced) {
                continue;
            }
            for (let i = room.y; i < room.height + room.y; i++) {
                for (let j = room.x; j < room.width + room.x; j++) {
                    map[i][j] = new Tile();
                }
            }
            rooms.push(room);
        }
        return {
            map,
            rooms
        };
    }
}
export class World {
    constructor(witdh, heigth) {
        this.rooms = [];
        this.map = [];
        this.witdh = 100;
        this.heigth = 100;
        if (witdh) {
            this.witdh = witdh;
        }
        if (heigth) {
            this.heigth = heigth;
        }
        let tileBlock = {
            backgroundColor: "#FFF",
            glyph: "#",
            color: "#000"
        };
        let blankMap = new Array(heigth).fill(tileBlock).map(() => {
            return new Array(witdh).fill(tileBlock);
        });
        let { map, rooms } = MapDigger.dig(blankMap, this.witdh, this.heigth);
        this.rooms = rooms;
        this.map = map;
    }
}
export class Room {
    constructor(RoomDTO) {
        this.x = RoomDTO.x;
        this.y = RoomDTO.y;
        this.height = RoomDTO.height;
        this.width = RoomDTO.width;
        this.id = UUIDv4Generator.generate();
    }
    get center() {
        return ({
            x: Math.floor(this.width / 2) + this.x,
            y: Math.floor(this.height / 2) + this.y
        });
    }
    intersectsWith(room) {
        if (this.x < room.x + room.width &&
            this.x + this.width > room.x &&
            this.y < room.y + room.height &&
            this.height + this.y > room.y) {
            return true;
        }
    }
}
;
