import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';



class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title,value,type }: Transaction): Transaction {
    const balance = this.transactionsRepository.getBalance();

    if(type === 'outcome' && value > balance.total){
        throw new Error("valor acima do saldo disponivel");
    }

    const transaction = this.transactionsRepository.create({title,value,type});

    return transaction;
  }
}

export default CreateTransactionService;
