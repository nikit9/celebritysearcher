var axios = require('axios');

// Bing API params
let bingKey = '0596e6f076a64db38b8e213594b32599';
let host = 'api.cognitive.microsoft.com';
let path = '/bing/v7.0/search';

// Azure Blob params
const storageName = 'instaappstorage';
const containerName = 'inst-app-container'
const azureconnstr = 'DefaultEndpointsProtocol=https;AccountName=instaappstorage;AccountKey=+pWReThloHRPsdhUIxByFMBMUbENjECIZwmKMFXTbQGsRo2ypfRt2r+zpGVAHnlwlP33/g12FoYmosSAohFj/w==;EndpointSuffix=core.windows.net'

var azure = require('azure-storage');
var blobService = azure.createBlobService(azureconnstr);

const makeSureBlobExists = (guid) => {
    /*  Goes over blobs and checks if a blob called guid exists.
        If not, creates it. */
    let exists = false;
    // List blobs:
    blobService.listBlobsSegmented(containerName, null, (error, results) => {
        if (!error) {
            results.entries.forEach(blob => {
                if (blob.name === guid + '.json')
                    exists = true;
            });
        }
        if (!exists){
            // Create new blob with empty text
            blobService.createBlockBlobFromText(containerName, guid+'.json', '', (error, result) => {
                if(!error)
                    console.log("New blob created!");
            });
        }
    });
}

module.exports = {
    searchBing: function (name) {
        /*  Searched Bing for name's Instagram, returns first link from search results */
        const axiosConfig = {
            headers: {'Ocp-Apim-Subscription-Key': bingKey}
        }

        return axios.get('https://' + host + path + '?q=' + encodeURIComponent(name), axiosConfig)
        .then(function(response) {
            return response.data.webPages.value[0].url;
        });
    },

    fetchHistory: function (guid) {
        /*  First make sure that a blob named guid exists, then returns data from it */
        makeSureBlobExists(guid);
        return axios.get('https://' + storageName + '.blob.core.windows.net/' + containerName + '/' + guid + '.json')
        .then(function(response) {
            return response.data
        });
    },

    saveHistory: function(guid, history) {
        /*  Saves history to blob */
        blobService.createBlockBlobFromText(containerName, guid + '.json', history.toString(), null, error => {
            if (error) {
                console.log(error);
            }
            else {
                return history;
            }
        });
    }
}