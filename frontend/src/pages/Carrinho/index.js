import Header from 'components/Header';
import styles from './Carrinho.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import Item from 'components/Item';
import { resetarCarrinho } from 'store/reducers/carrinho';

//Marques Thanatos - Initialized on 06/02/2026


export default function Carrinho() {
  const dispatch = useDispatch();
  var itensPurchased;

  const { carrinho, total } = useSelector(state => {
    let total = 0;
    const regexp = new RegExp(state.busca, 'i');

    const carrinhoReduce = state.carrinho.reduce((itens, itemNoCarrinho) => {
      const item = state.itens.find(item => item.id === itemNoCarrinho.id);
      total += (item.preco * itemNoCarrinho.quantidade);
      
      if (item.titulo.match(regexp)) {
        itens.push({
          ...item,
          quantidade: itemNoCarrinho.quantidade,
        });
      }
      itensPurchased = itens;
      return itens;
    }, []);
    return {
      carrinho: carrinhoReduce,
      total,
    };
    
  });

  const finishPurchase = async () => {

    try {
      const res = await fetch('http://localhost:4000/orders', {
        method: 'POST', 
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        // Always stringify the body and send only identifiers
        body: JSON.stringify({
          itens: itensPurchased,
        // total: total // Avoid sending this; let backend calculate it!
      }),
    });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const productSubmited = res.json();

      console.log(itensPurchased);
      console.log("Purchase finished!");
      dispatch(resetarCarrinho());
    } catch (error) {
      console.error("Submission failed:", error);
    };
  };

  return (
    <div>
      <Header
        titulo='Carrinho de compras'
        descricao='Confira produtos que você adicionou ao carrinho.'
      />
      <div className={styles.carrinho}>
        {carrinho.map(item => <Item key={item.id} {...item} carrinho />)}
        <div className={styles.total}>
          <strong>
            Resumo da compra
          </strong>
          <span>
            Subtotal: <strong> R$ {total.toFixed(2)} </strong>
          </span>
        </div>
        <button
          className={styles.finalizar}
          //onClick={() => dispatch(resetarCarrinho())}
          onClick={ finishPurchase }
        >
          Finalizar compra
        </button>
      </div>
    </div>
  )
}