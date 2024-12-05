export const findIndexInDb = async (
  uri: string,
  connection: any,
  id?: string,
): Promise<any> => {
  const url = `${uri}/${id}`;
  console.log(url);
  let cacheEntry = await connection.findOne({ url: id ? url : uri }).exec();
  console.log('test12321', cacheEntry);
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
