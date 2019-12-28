const uri =
  "https://theunitedstates.io/congress-legislators/legislators-current.json";

export function getCongressMembers(cb) {
  let members = [];

  return fetch(uri).then(response => {
    return response.json().then(data => cb(data));
  });
}
