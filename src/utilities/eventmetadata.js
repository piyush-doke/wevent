import {apiClient} from '../aws';

let response = "{\"neighborhoods\": [\"07030\", \"07075\", \"11428\", \"11429\", \"Alphabet City\", \"Astoria\", \"Barren Island\", \"Battery Park City\", \"Bedford\", \"Bedford Park\", \"Belmont\", \"Bergen\", \"Boerum Hill\", \"Brooklyn Heights\", \"Brooklyn Navy Yard\", \"Bushwick\", \"Canarsie\", \"Carnegie Hill\", \"Carroll Gardens\", \"Central Harlem\", \"Central Park\", \"Chelsea\", \"Civic Center\", \"Claremont\", \"Co-op City\", \"Corona\", \"Crown Heights\", \"Cypress Hills\", \"Downtown Brooklyn\", \"Downtown Newark\", \"Downtown Orange\", \"Downtown Valley Stream\", \"Dumbo\", \"East Flatbush\", \"East Garden City\", \"East Harlem\", \"East New York\", \"East Village\", \"East Williamsburg\", \"Exchange Place\", \"Financial District\", \"Flatbush\", \"Flatlands\", \"Flushing\", \"Forest Hills\", \"Fort Greene\", \"Fresh Meadows\", \"Garment District\", \"Glendale\", \"Gowanus\", \"Gramercy Park\", \"Gramercy Park Historic District\", \"Greenpoint\", \"Greenwich Village\", \"Greenwood Heights\", \"Hamilton Heights\", \"Harsimus\", \"Hell's Kitchen\", \"Hudson Square\", \"Hudson Yards\", \"Ironbound\", \"Jamaica\", \"Jamaica Estates\", \"Journal Square\", \"Keighry Head\", \"Kips Bay\", \"Koreatown\", \"Lenox Hill\", \"Lincoln Square\", \"Long Island City\", \"Lower East Side\", \"Manhattan\", \"Manhattan Valley\", \"Manhattanville\", \"Midtown East\", \"Morningside Heights\", \"Mott Haven\", \"Multiplex Concrete\", \"Murray Hill\", \"New Durham\", \"NoMad\", \"Nolita\", \"Ozone Park\", \"Park Slope\", \"Prospect Heights\", \"Prospect Lefferts Gardens\", \"Prospect Park\", \"Randalls and Wards Island\", \"Red Hook\", \"Richmond Hill\", \"Ridgewood\", \"Roosevelt Island\", \"Seventh Avenue\", \"SoHo\", \"South Broadway\", \"South Jamaica\", \"Springfield Gardens\", \"St. Albans\", \"Stapleton\", \"Stuyvesant Heights\", \"Sunset Park\", \"Teaneck Riverftont\", \"The Bowery\", \"The Flatiron District\", \"The Meatpacking District\", \"The Village\", \"Theater District\", \"TriBeCa\", \"Turtle Bay\", \"Two Bridges\", \"Union Hill\", \"University Heights\", \"Upper East Side\", \"Upper West Side\", \"Van Vorst Park\", \"Washington Heights\", \"West Hoboken\", \"West Village\", \"Williamsburg\", \"Woodside\"], \"categories\": [\"Auto, Boat & Air\", \"Business & Professional\", \"Community & Culture\", \"Family & Education\", \"Fashion & Beauty\", \"Film, Media & Entertainment\", \"Food & Drink\", \"Health & Wellness\", \"Hobbies & Special Interest\", \"Home & Lifestyle\", \"Music\", \"Other\", \"Performing & Visual Arts\", \"Religion & Spirituality\", \"Science & Technology\", \"Seasonal & Holiday\", \"Sports & Fitness\", \"Travel & Outdoor\", \"Unkown\"]}"

let result = JSON.parse(response);
let neighborhoods = result.neighborhoods;
let categories = result.categories;

function getInfo () {
    apiClient.getEventMetaData().then(function(result) {    
        callback(result);    
    });
}

function callback(response){
    let result = JSON.parse(response.data.body)
    neighborhoods = result.neighborhoods;
    categories = result.categories;
    console.log(neighborhoods);
    
}
//getInfo()

export {neighborhoods, categories}