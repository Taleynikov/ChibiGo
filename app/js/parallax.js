function mouseParallax() {
    const nodes = document.querySelectorAll('[data-mouseparallax]');

    if (nodes.length) {
        nodes.forEach(node => {
            addNodeData(node, 'mouseParallax', {
                axis: node.getAttribute('data-mouseparallax-axis').split(' '),
                speed: node.getAttribute('data-mouseparallax-speed').split(' ').map(str => parseFloat(str))
            });

            const data = getNodeData(node).mouseParallax;

            data.event = function(event) {
                    let speed = data.speed, fixed = 2;

                    let screenX = screen.availWidth, screenY = screen.availHeight;

                    let eventX  = event.pageX, eventY  = event.pageY;

                    let coordX  = eventX - screenX / 2, coordY  = eventY - screenY / 2;

                    let sectorX, sectorY, offsetX, offsetY;

                    if (speed.length > 1) {
                        sectorX = (screen.availWidth / 2) / speed[0];
                        sectorY = (screen.availHeight / 2) / speed[1];

                        offsetX = calcOffset(coordX, sectorX, speed[0]);
                        offsetY = calcOffset(coordY, sectorY, speed[1]);
                    } else {
                        sectorX = (screen.availWidth / 2) / speed[0];
                        sectorY = (screen.availHeight / 2) / speed[0];

                        offsetX = calcOffset(coordX, sectorX, speed[0]);
                        offsetY = calcOffset(coordY, sectorY, speed[0]);
                    }

                    function calcOffset(coord, sector, speed) { return Math.round((-(coord / speed / sector * speed)) * (10 ** fixed)) / (10 ** fixed) }

                    node.style.transform = `translate(${data.axis.includes('x') ? `${offsetX}%` : 0}, ${data.axis.includes('y') ? `${offsetY}%` : 0})`;
            };

            document.addEventListener('mousemove', data.event );
        });
    }

}

mouseParallax.deactivate = () => {
    document.querySelectorAll('[data-mouseparallax]').forEach(node => {
        let data = getNodeData(node);

        document.removeEventListener('mousemove', data.mouseParallax.event);

        delete data.mouseParallax;
    });
};

mouseParallax();