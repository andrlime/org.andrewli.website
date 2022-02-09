import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  url: string,
  img: string,
  title: string,
  desc: string,
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Data>>
) {
  let Airtable = require('airtable');
    Airtable.configure({
        endpointUrl: 'https://api.airtable.com',
        apiKey: '***REMOVED***'
    });
    let base = Airtable.base('***REMOVED***');
    let arr: Array<Data> = [];

    base('csprojects').select({
        maxRecords: 100,
        view: "Grid view"
    }).eachPage(function page(records: any, fetchNextPage: Function) {
        console.log(records);
        records.forEach(function (record: any) {
            arr.push(record.fields);
        });
        fetchNextPage();
    }, function done(err: Error) {
        if(err) console.log(err);
        console.log(arr);
        res.status(200).json(arr);
    });
}