import config from './config';

var apigClientFactory = require('aws-api-gateway-client').default;

var apigClientAws = apigClientFactory.newClient(config);

class ApiClient
{
    constructor()
    {
        
    }

    searchEvents(neighborhood, start, category)
    {
        var pathParams = {};
        var pathTemplate = '/searchEvents';
        var method = 'GET';
        var additionalParams = {
            queryParams: { neighborhood, start, category }
        };
        var body = {};
        return this.invokeApi(pathParams, pathTemplate, method, additionalParams, body);
    }

    getPlans(user_id)
    {
        var pathParams = {};
        var pathTemplate = '/getPlans';
        var method = 'GET';
        var additionalParams = {
            queryParams: {
                "user_id": user_id
            }
        };
        var body = {};
        return this.invokeApi(pathParams, pathTemplate, method, additionalParams, body);    
    }

    createPlan(name, start, trigger_option, host_id)
    {
        var pathParams = {};
        var pathTemplate = '/createPlan';
        var method = 'POST';
        var additionalParams = {};
        var body = {name, start, trigger_option, host_id};
        return this.invokeApi(pathParams, pathTemplate, method, additionalParams, body);    
    }

    updatePlan(body)
    {
        var pathParams = {};
        var pathTemplate = '/updatePlan';
        var method = 'Put';
        var additionalParams = {};
        return this.invokeApi(pathParams, pathTemplate, method, additionalParams, body); 
    }

    getEventMetaData()
    {
        var pathParams = {};
        var pathTemplate = '/getEventMetaData';
        var method = 'Get';
        var additionalParams = {};
        var body = {};
        return this.invokeApi(pathParams, pathTemplate, method, additionalParams, body); 
    }

    invokeApi(pathParams, pathTemplate, method, additionalParams, body)
    {
        return apigClientAws.invokeApi(pathParams, pathTemplate, method, additionalParams, body)
        .then(function(result){
            //This is where you would put a success callback
            console.log('apiClient result', result);
            return result;
        }).catch( function(result){
            //This is where you would put an error callback
            console.log('apiClient error', result);
            return result;
        });
    }

}
const apigClient = new ApiClient();

export default apigClient;