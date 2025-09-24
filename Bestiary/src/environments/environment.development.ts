export const environment = {
PORT_VAR: 'http://127.0.0.1:5000/species'
};

export const CREATURE_URL_SOURCE = {
CREATURE_PORT_VAR:'http://127.0.0.1:5000/beast/'
};

/* TODO: 
    - Separate the backend URL from the endpoint - http://127.0.0.1:5000 in one variable, /species in another.
*/
/* NOTE: Things that seem odd to me
    - Why are they two different objects?
    - Why are their naming conventions so different
        - beast is called CREATURE_PORT_VAR 
            -- why is it called _PORT_VAR?
    - creature/beast - we should pick one.
*/