function ProductCard(props){
  return(
    <div>
      <h3>Title:{props.title}</h3>
      <p>Price:{props.price}</p>
    </div>
  )
}
export default ProductCard;