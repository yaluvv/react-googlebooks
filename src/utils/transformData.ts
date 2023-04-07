const returnData = (data: any) => {
  return {
    id: data.id,
    title: data.volumeInfo.title ? data.volumeInfo.title : 'Названия нет',
    description: data.volumeInfo.description
      ? data.volumeInfo.description
      : 'Описания нет',
    previewImg: data.volumeInfo.imageLinks
      ? data.volumeInfo.imageLinks.thumbnail
      : null,
    authors: data.volumeInfo.authors
      ? data.volumeInfo.authors
      : 'Список авторов нет',
    categories: data.volumeInfo.categories
      ? data.volumeInfo.categories
      : 'Категорий нет',
  };
};

export const transformData = (data: any) => {
  if (!data.totalItems) {
    return returnData(data);
  }
  if (!data.items) {
    return {
      totalItems: 0,
      books: [],
    };
  } else {
    const newDataBooks = data.items.map((item: any) => {
      return returnData(item);
    });
    return {
      totalItems: data.totalItems,
      books: newDataBooks,
    };
  }
};
