const hipotenusa = 8;
const getPositions = () => {
    const x = Math.cos(Math.random() * Math.PI * 2) * hipotenusa;
    const z = Math.sin(Math.random() * Math.PI * 2) * hipotenusa;
    const y = Math.random() * hipotenusa * 2 - hipotenusa;
    console.log(x, y, z)
    return { x, y, z };
};
export default getPositions;