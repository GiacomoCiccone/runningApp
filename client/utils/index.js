
//This function calculate the calorie expenditure using the fromula from https://www.corsa-e-sport.it/corsa/consumo-calorico-della-corsa.htm
export const calcCalories = (weight, distance) => weight * distance;

//This function takes in latitude and longitude of two location and returns the distance between them in km
export const calcDistance = (pos1, pos2) => {
    let { latitude: lat1, longitude: lon1 } = pos1;
    let { latitude: lat2, longitude: lon2 } = pos2;
    const R = 6371; // km
    lon1 = (lon1 * Math.PI) / 180;
    lon2 = (lon2 * Math.PI) / 180;
    lat1 = (lat1 * Math.PI) / 180;
    lat2 = (lat2 * Math.PI) / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a =
        Math.pow(Math.sin(dlat / 2), 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));
    return Math.abs(c * R);
};

//This function stringify the milliseconds into HH:MM:SS format
export const msToHMS = (ms) => {
    let seconds = parseInt(ms / 1000);
    const hours = parseInt(seconds / 3600);
    seconds = seconds % 3600;
    const minutes = parseInt(seconds / 60);
    seconds = seconds % 60;
    const hourPadded = hours.toString().padStart(2, "0");
    const minutesPadded = minutes.toString().padStart(2, "0");
    const secondsPadded = seconds.toString().padStart(2, "0");
    return `${hourPadded}:${minutesPadded}:${secondsPadded}`;
};

//This function calculate the BMI and classifies it
export const calcBMI = (weight, height) => {
    const heightInMeters = height / 100;
    const BMI = weight / (heightInMeters * heightInMeters);
    let label;
    if (BMI < 18.5) label = "Sottopeso";
    if (BMI >= 18.5 && BMI < 24.99) label = "Normale";
    if (BMI >= 24.99 && BMI < 30) label = "Sovrappeso";
    if (BMI >= 30 && BMI < 35) label = "Obeso classe I";
    if (BMI >= 35 && BMI < 40) label = "Obeso classe II";
    if (BMI >= 40) label = "Obeso classe III";
    return {
        BMI,
        label,
    };
};

//This function convert a color in hex format into a RGBA value
export const hexToRgbA = (hex, alpha) => {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
};