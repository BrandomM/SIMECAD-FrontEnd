import styles from "./ProductCard.module.scss";

export function ProductCard({ image, name, price }) {
  return (
    <li className={`${styles.productCard} card p-5`}>
      <img
        className={styles.picture}
        width={230}
        height={345}
        src={image}
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <button href="#" class="btn btn-azulClaro">
          Agregar al carrito
        </button>
        <h4 className="mt-3">{`$ ${price}`}</h4>
      </div>
    </li>
  );
}
