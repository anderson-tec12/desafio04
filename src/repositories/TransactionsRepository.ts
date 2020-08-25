import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransationDTO {
  type: 'income' | 'outcome';
  title: string;
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [
      // {
      //   id: 'uuid',
      //   title: 'Salário',
      //   value: 4000,
      //   type: 'income',
      // },
      // {
      //   id: 'uuid',
      //   title: 'Freela',
      //   value: 2000,
      //   type: 'income',
      // },
      // {
      //   id: 'uuid',
      //   title: 'Pagamento da fatura',
      //   value: 4000,
      //   type: 'outcome',
      // },
    ];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (acc, el) => {
        acc[el.type] += el.value;
        return acc;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    const values: Balance = {
      income: balance.income,
      outcome: balance.outcome,
      total: balance.income - balance.outcome,
    };
    return values;
  }

  public create({ title, type, value }: TransationDTO): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
