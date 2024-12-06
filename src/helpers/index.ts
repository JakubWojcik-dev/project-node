export const findIndexInDb = async (
  uri: string,
  connection: any,
  id?: string,
): Promise<any> => {
  const url = id ? `${uri}/${id}` : uri;
  let cacheEntry = await connection.findOne({ url: url }).exec();

  if (!id || (id && cacheEntry)) {
    return cacheEntry ? cacheEntry.data : null;
  }
  cacheEntry = await connection.findOne({ url: uri }).exec();
  console.log(cacheEntry);
  //console.log('data123', cacheEntry.data.data[Number(id) - 1]);
  return cacheEntry ? cacheEntry.data.data[Number(id) - 1] : null;
};

export const saveToDb = async (
  uri: string,
  value: any,
  connection: any,
): Promise<void> => {
  await connection
    .findOneAndUpdate(
      { url: uri },
      { data: value },
      { upsert: true, new: true },
    )
    .exec();
};

export const trimMessage = (data: any): string => {
  let str: string;
  data.results.map((element) => {
    str += element.opening_crawl;
  });
  const message = str
    .replace(/[.,\n\r]/g, ' ')
    .replace(/ {2,}/g, ' ')
    .trim();
  return message;
};
