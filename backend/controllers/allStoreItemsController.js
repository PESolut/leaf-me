const express = require('express')
const storeItems = express.Router()
const {getTrueAllStoreItems} = require('../queries/storeitems.js')

const isPageQueryADigit = (pageQuery) => {
    const pageAsInteger = parseInt(pageQuery)
    const digitRegex = /^\d$/;
    return digitRegex.test(pageAsInteger);
  };

  storeItems.get('/', async (req, res) => {
    try {
        const allStoreItems = await getTrueAllStoreItems();

        // check if the page parameter exists
        if (req.query.page) {
            // check that the page parameter is a valid digit
            if (!isPageQueryADigit(req.query.page)) {
                throw { message: 'page must be a valid digit!', status: 'error' };
            }

            // calculate the start and end index of the items for the requested page
            const itemsPerPage = 12;
            const page = parseInt(req.query.page);
            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;

            // slice the allStoreItems array to get the items for the requested page
            const storeItemsRange = allStoreItems.slice(startIndex, endIndex);

            res.status(200).json(storeItemsRange);
        } else {
            res.status(200).json(allStoreItems);
        }

    } catch (error) {
        res.status(500).json({ error: error });
    }
});



    

    // // check to see if we have a response of storeItems
    // if(allStoreItems.length){

    //     console.log('page',req.query.page)
        
    //     // check if the query page parameters exist
    //     if(req.query.page){
    //         // Check if page parameter is a digit
    //         if (!isDigit(parseInt(req.query.page))) {
    //         throw { message: 'Start and end must be valid numbers!', status: 'error' };
    //       }
    //         console.log(req.query.page)          
    //     }
    //     res.status(200).json(allStoreItems)
    // } else {
    //     res.status(500).json({Error: 'server error'})
    // }


module.exports = storeItems