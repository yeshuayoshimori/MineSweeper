//the Reveal N Flag buttons, keeps track of which tool a left click uses
class Toolbar {
    constructor(root, tools) {
        this.tools = tools; //reveal || flag. Tools
        this.buttons = root.querySelectorAll("[data-tool]"); //data-tool in the html
        this.current = tools.reveal;

        for (const button of this.buttons) {
            button.addEventListener("click", () => this.select(button.dataset.tool));
        }
        this.select("reveal");
    }

    select(toolName) {
        this.current = this.tools[toolName];

        for (const button of this.buttons) { //only the chosen button gets the active look
            button.classList.toggle("active", button.dataset.tool === toolName);
        }
    }
}

export default Toolbar;
