//abstract, need to make subclasses RevealTool and FlagTool
class Tool { //cant use Tool
    constructor(name) {
        if (new.target === Tool) {
            throw new Error("Tool is abstract, use RevealTool or FlagTool");
        }
        this.name = name;
    }

    apply(game, row, col) { //every subclass has its own version
        throw new Error("apply() is not written in " + this.name);
    }
}

export default Tool;
