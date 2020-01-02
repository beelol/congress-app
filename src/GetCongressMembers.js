const uri =
  "https://theunitedstates.io/congress-legislators/legislators-current.json";

export function getCongressMembers(cb) {
  return fetch(uri).then(response => {
    return response.json().then(data => cb(data));
  });
}

export function getCongressMemberImage(cb, bioguide, size = "225x275") {
  const imguri = `https://theunitedstates.io/images/congress/${size}/${bioguide}.jpg`;

  return fetch(imguri).then(response => {
    if (response.status >= 200 && response.status < 300) {
      return response.blob().then(image => {
        // create a local URL for fetched image
        let localURL = URL.createObjectURL(image);
        cb(localURL);
      });
    } else {
    }
  });
}
