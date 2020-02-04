document.addEventListener('mousemove', event => {
    let speed = .8,
        fixed = 2;

    let screenX = screen.availWidth,
        screenY = screen.availHeight;

    let eventX  = event.pageX,
        eventY  = event.pageY;

    let sectorX = (screen.availWidth / 2) / speed,
        sectorY = (screen.availHeight / 2) / speed;

    let coordX  = eventX - screenX / 2, 
        coordY  = -(eventY - screenY / 2);

    let offsetX = calcOffset(coordX, sectorX),
        offsetY = calcOffset(coordY, sectorY);

    console.log(offsetX, offsetY);

    function calcOffset(coord, sector) { return Math.round((-(coord / speed / sector * speed)) * (10 ** fixed)) / (10 ** fixed) }

    document.querySelector('.mountains-layer').style.transform = `translate(${offsetX}%, 0)`;
});