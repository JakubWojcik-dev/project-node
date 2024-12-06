export const findIndexInDb = async (
  uri: string,
  connection: any,
  id?: string,
): Promise<any> => {
  const url = `${uri}/${id}`;
  console.log(url);
  let cacheEntry = await connection.findOne({ url: id ? url : uri }).exec();

  if (!id) {
    return cacheEntry ? cacheEntry : null;
  }
  cacheEntry = await connection.findOne({ url: uri }).exec();

  return cacheEntry ? cacheEntry.data[Number(id) - 1] : null;
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
