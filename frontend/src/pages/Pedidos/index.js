import Header from 'components/Header';
import styles from './Carrinho.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import Item from 'components/Item';
import { resetarCarrinho } from 'store/reducers/carrinho';
import { useEffect, useState } from 'react';

//Marques Thanatos - Initialized on 06/02/2026


export default function Pedidos() {
  const dispatch = useDispatch();
  var itensPurchased;

  useEffect(() =>{
    const fetchData = async () => {
        try{
            const carrinhoReduce = await fetch('http://localhost:4000/pedidos', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

        }
        catch (err) {
        setError('Internal Server Error. Please try again later.');
        }
    };

    fetchData();
  }, [dispatch]);

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

/* 
    try {
          const res = await fetch('http://localhost:4000/products', {
            method: 'GET', 
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            credentials: 'include'
        });
    
        if (!res.ok) {
          throw new Error(`Erro no servidor: ${res.status}`);
        }

        const userData = await res.json();
        setUser(userData); // Update auth context

        navigate('/home');                   
    } catch (error) {
        console.error("Submission failed:", error);
        setError(error.message);
    };

*/