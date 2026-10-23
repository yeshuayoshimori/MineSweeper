//one pic, sprites.png holds every sprite in a row, this is to show just one of them on an element
class SpriteSheet {

    //same order as the pictures in sprites.png
    static NAMES = [
        "hidden", "flag", "blank",
        "n1", "n2", "n3", "n4", "n5", "n6", "n7", "n8",
        "mine", "wrongFlag",
        "faceHappy", "faceCool", "faceDead",
    ];

    constructor(imageUrl, tileSize, scale) {
        this.imageUrl = imageUrl;
        this.tileSize = tileSize;//size of one sprite in the original picture 16px
        this.scale = scale; //pixel art proper scaling so the pixels look good
    }

    get pixelSize() { //size of one sprite on the screen
        return this.tileSize * this.scale;
    }

    static numberName(count) { //0 mines around blank tile,the rest are n1 to n8, cause 8 around cell 
        return count === 0 ? "blank" : `n${count}`;
    }

    draw(element, name) { //put the sprite called "name" as the background of the element
        const index = SpriteSheet.NAMES.indexOf(name);
        if (index === -1) throw new Error(`there is no sprite called ${name}`);

        element.style.backgroundImage = `url("${this.imageUrl}")`;
        element.style.backgroundSize = `${SpriteSheet.NAMES.length * this.pixelSize}px ${this.pixelSize}px`; //whole picture, scaled
        element.style.backgroundPosition = `${-index * this.pixelSize}px 0`; //slide the picture so only the sprite we wANT is showing
    }
}

export default SpriteSheet;
