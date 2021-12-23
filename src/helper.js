export const getConfig = () => {
    return (
      {
        headers: { 
          Authorization: `Bearer ${localStorage.getItem("token")}` 
        }
      }
    )
  }
  
export const checkAvailability = (warehouse) => {
    return warehouse.habilitado && (warehouse.packagesCount < warehouse.capacidadbultos)
}