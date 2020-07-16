import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface transactionDTO{
  title: string, 
  value: number, 
  type: 'income' | 'outcome';
}

interface Lista{
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Lista {

    const balance = this.getBalance();

    const transactions: Transaction[] = [...this.transactions];

    const obj: Lista = { transactions,balance };
    
    return obj;
  }

  public getBalance(): Balance {

    const { income, outcome } = this.transactions.reduce(
      (accumulator: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            accumulator.income += Number(transaction.value);
            break;
          case 'outcome':
            accumulator.outcome += Number(transaction.value);
            break;
          default:
            break;
        }
        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    const total = income - outcome;
    return { income, outcome, total };
  }

  public create({ title,value,type }:transactionDTO): Transaction {

    const transaction = new Transaction({title,value,type});

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
