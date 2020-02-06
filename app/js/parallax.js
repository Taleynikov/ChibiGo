function mouseParallax() {
    const nodes = document.querySelectorAll('[data-mouseparallax]');

    if (nodes.length) {
        nodes.forEach(node => {
            nodeData.add(node, 'mouseParallax', {
                axis: node.getAttribute('data-mouseparallax-axis').split(' '),
                range: node.getAttribute('data-mouseparallax-range').split(' ').map(str => parseFloat(str))
            });

            const data = nodeData.get(node).mouseParallax;

            data.event = function(event) {
                let range = data.range, fixed = 2;

                let screenX = screen.availWidth, screenY = screen.availHeight;

                let eventX  = event.pageX, eventY  = event.pageY;

                let coordX  = eventX - screenX / 2, coordY  = eventY - screenY / 2;

                let sectorX, sectorY, offsetX, offsetY;

                if (range.length > 1) {
                    sectorX = (screen.availWidth / 2) / range[0];
                    sectorY = (screen.availHeight / 2) / range[1];

                    offsetX = calcOffset(coordX, sectorX, range[0]);
                    offsetY = calcOffset(coordY, sectorY, range[1]);
                } else {
                    sectorX = (screen.availWidth / 2) / range[0];
                    sectorY = (screen.availHeight / 2) / range[0];

                    offsetX = calcOffset(coordX, sectorX, range[0]);
                    offsetY = calcOffset(coordY, sectorY, range[0]);
                }

                function calcOffset(coord, sector, range) { return Math.round((-(coord / range / sector * range)) * (10 ** fixed)) / (10 ** fixed) }

                node.style.transform = `translate(${data.axis.includes('x') ? `${offsetX}%` : 0}, ${data.axis.includes('y') ? `${offsetY}%` : 0})`;
                
                data.offset = {
                    x: offsetX,
                    y: offsetY
                };
            };

            document.addEventListener('mousemove', data.event );
        });
    }

}

mouseParallax.deactivate = () => {
    document.querySelectorAll('[data-mouseparallax]').forEach(node => {
        let data = nodeData.get(node);

        document.removeEventListener('mousemove', data.mouseParallax.event);

        nodeData.remove(node, 'mouseParallax');
    });
};

mouseParallax();