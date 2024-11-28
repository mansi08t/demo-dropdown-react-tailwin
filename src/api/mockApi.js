export const fetchMockedData = async (query, page, pageSize = 20) => {
    const totalItems = 10000;
    const allItems = Array.from({ length: totalItems }, (_, i) => ({
      id: i + 1,
      name: `Item ${i + 1}`,
      imageURL: `https://via.placeholder.com/50?text=Item+${i + 1}`,
    }));
  
    const filteredItems = allItems.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  
    const paginatedItems = filteredItems.slice(
      (page - 1) * pageSize,
      page * pageSize
    );
  
    return new Promise(resolve =>
      setTimeout(() => resolve(paginatedItems), 500)
    );
  };
  