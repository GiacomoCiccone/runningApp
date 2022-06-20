export const clamp = (min, val, max) => Math.max(Math.min(max, val), min);
export const translateZ = (perspective, val) =>
    perspective / (perspective - val);
export const radiansToDeg = (rad) => (rad * 180) / Math.PI;
export const calcCalories = (weight, distance) => weight * distance;
export const calcDistance = (pos1, pos2) => {
    //This function takes in latitude and longitude of two location and returns the distance between them in km
    let { latitude: lat1, longitude: lon1 } = pos1;
    let { latitude: lat2, longitude: lon2 } = pos2;
    const R = 6371; // km
    lon1 =  lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2)
             + Math.cos(lat1) * Math.cos(lat2)
             * Math.pow(Math.sin(dlon / 2),2);
           
    let c = 2 * Math.asin(Math.sqrt(a));
    return Math.abs(c * R);
};

export const msToHMS = ( ms ) => {
    // 1- Convert to seconds:
    let seconds = ms / 1000;
    // 2- Extract hours:
    const hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
    seconds = seconds % 3600; // seconds remaining after extracting hours
    // 3- Extract minutes:
    const minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
    // 4- Keep only seconds not extracted to minutes:
    seconds = seconds % 60;

    const hourPadded = hours.toString().padStart(2, "0")
    const minutesPadded = minutes.toString().padStart(2, "0")
    const secondsPadded = seconds.toString().padStart(2, "0")
    return `${hourPadded}:${minutesPadded}:${secondsPadded}`
}

const toRadians = number => number * Math.PI / 180;

const calculateGreatCircleDistance = (locationA, locationZ) => {
  const lat1 = locationA.latitude;
  const lon1 = locationA.longitude;
  const lat2 = locationZ.latitude;
  const lon2 = locationZ.longitude;

  // DOCUMENTATION: http://www.movable-type.co.uk/scripts/latlong.html
  const p1 = toRadians(lat1);
  const p2 = toRadians(lat2);
  const deltagamma = toRadians(lon2 - lon1);
  const R = 6371e3; // gives d in metres
  const d =
    Math.acos(
      Math.sin(p1) * Math.sin(p2) + Math.cos(p1) * Math.cos(p2) * Math.cos(deltagamma)
    ) * R;

  return isNaN(d) ? 0 : d;
}

//kalman filter for raw gps data
export const kalman = (location, lastLocation, constant = 500) => {
    const accuracy = Math.max(location.accuracy, 1);
    const result = { ...location, ...lastLocation };
  
    if (!lastLocation) {
      result.variance = accuracy * accuracy;
    } else {
      const timestampInc =
        location.timestamp.getTime() - lastLocation.timestamp.getTime();
  
      if (timestampInc > 0) {
        // We can tune the velocity and particularly the coefficient at the end
        const velocity =
          calculateGreatCircleDistance(location, lastLocation) /
          timestampInc *
          constant;
        result.variance += timestampInc * velocity * velocity / 1000;
      }
  
      const k = result.variance / (result.variance + accuracy * accuracy);
      result.latitude += k * (location.latitude - lastLocation.latitude);
      result.longitude += k * (location.longitude - lastLocation.longitude);
      result.variance = (1 - k) * result.variance;
    }

    const pick = {
        latitude: result.latitude,
        longitude: result.longitude
    }
  
    const toReturn = {
      ...location,
      ...pick
    };
  
    return toReturn
  };

export const fakeUser = {
    token: "abcdefg",
    userInfo: {
        _id: 123456,
        fullName: "John Doe",
        email: "johndoe@mymail.com",
        gender: "male",
        weight: 77,
        height: 178,
    },
};
