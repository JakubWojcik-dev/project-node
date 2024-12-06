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

  return cacheEntry ? cacheEntry.data.results[Number(id) - 1] : null;
};

export const saveToDb = async (
  uri: string,
  value: any,
  connection: any,
): Promise<void> => {
  if (value?.detail === 'Not found') return;
  await connection
    .findOneAndUpdate(
      { url: uri },
      { data: value },
      { upsert: true, new: true },
    )
    .exec();
};

export const trimMessage = (data: any): string => {
  let str: string = '';
  data.results.map((element) => {
    str += element.opening_crawl;
  });
  return str
    .replace(/[!?.,\n\r]/g, ' ')
    .replace(/ {2,}/g, ' ')
    .trim();
};
