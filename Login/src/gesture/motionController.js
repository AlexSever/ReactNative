class motionController {
    constructor() {
        this.startPoint = { x: 0, y: 0 };
        this.minDistance = 20
    }
    // Minimum move distance sets manually.
    // Left Menu area is 60. Don't handle touch within this area.
    startMove(gestureObj) {
        const { pageX, pageY } = gestureObj;
        this.startPoint = { x: pageX, y: pageY };
    }

    holdMove(gestureObj) {
        const { pageX, pageY } = gestureObj;

        const minDistance = this.minDistance;

        const xDistance = this.startPoint.x - pageX;
        const yDistance = this.startPoint.y - pageY;

        if (this.startPoint.x > 60) {
            if (Math.abs(xDistance) > Math.abs(yDistance)) {
                if (xDistance < -minDistance) {
                    return 'right';
                } else if (xDistance > minDistance) {
                    return 'left'
                }
            } else {
                if (yDistance < -minDistance) {
                    return 'down';
                } else if (yDistance > minDistance) {
                    return 'up'
                }
            }
        }
    }

    endMove(gestureObj) {
        const { pageX, pageY } = gestureObj;

        const xDistance = this.startPoint.x - pageX;
        const yDistance = this.startPoint.y - pageY;

        if (this.startPoint.x > 60) {
            if (Math.abs(xDistance) > Math.abs(yDistance)) {
                if (xDistance < 0) {
                    return 'right';
                }
                return 'left'
            } else {
                if (yDistance < 0) {
                    return 'down';
                }
                return 'up'
            }
        }
    }
}

export default motionController;