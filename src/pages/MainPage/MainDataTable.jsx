import DataTable from "react-data-table-component";

export function DataTableComponent({
    allCategories,
    products,
    setProducts,
    units,
    storages,
    selectedCategoryId,
  }) 
  
  {
    const filteredProducts = selectedCategoryId !== null ? products.filter((product)=>product.categoryId === selectedCategoryId): products;

    const paginationOptions = {
      rowsPerPageText: "Satır Sayısı",
      rangeSeparatorText: "->",
      selectAllRowsItemText: "Tümü",
      selectAllRowsItem: true,
    };

    const tableCustomStyles = {
      headRow: {
        style: {
          color:'#223336',
          backgroundColor: '#e7eef0'
        },
      },
      striped: {
          default: 'red'
      },
    }

    const columns = [
      {
        name: "Ürün",
        selector: (row) => row.name,
        sortable: true,
      },
      {
        name: "Kategori",
        selector: (row) => {
          const category = allCategories.find((x) => x.id == row.categoryId);
          if (category) {
            return category.name;
          } else {
            return "Kategori bilgisi girilmemis";
          }
        },
      },
      {
        name: "Depo",
        selector: (row) => {
          const storage = storages.find((x) => x.id == row.storageId);
          if (storage) {
            return storage.name;
          } else {
            return "Depo bilgisi girilmemis";
          }
        },
      },
      {
        name: "Birim",
        selector: (row) => {
          const unit = units.find((x) => x.id == row.unitId);
          if (unit) {
            return unit.name;
          } else {
            return "Birim bilgisi girilmemis";
          }
        },
      },
      {
        name: "Adet",
        selector: (row) => row.amount,
        sortable: true,
      },
      {
        name: "Oluşturulma Tarihi",
        selector: (row) => {
          let splitDate = new Date(row.createDate).toISOString().split("-");
          return (
            splitDate[2].split("T")[0] + "-" + splitDate[1] + "-" + splitDate[0]
          );
        },
        sortable: true,
      },
    ];
    return (
      <DataTable
        columns={columns}
        data={filteredProducts}
        pagination
        paginationRowsPerPageOptions={[2, 5, 10]}
        paginationComponentOptions={paginationOptions}
        noDataComponent="Gösterilecek ürün bulunamadı"
        highlightOnHover
        customStyles={tableCustomStyles}
      />
    );
  }