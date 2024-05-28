import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: [],
  currentPage:1,
  totalPages :null,
  itemsPerPage:5,
  hasNext:false,
  hasPrevious:false,
  balance: 0,
  expense: 0,
  income: 0
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {

    setTransactions: (state, action) => {
      state.transactions = action.payload;
      const pages = Math.ceil(action.payload.length / state.itemsPerPage);
      state.totalPages = pages;
      state.hasNext = state.currentPage < pages;
      state.hasPrevious = state.currentPage > 1;
    },

    addTransactions: (state, action) => {
      const amount = Number(action.payload.amount);
      state.transactions.push(action.payload);
      if (action.payload.transactionType === 'income') {
        state.balance += amount;
        state.income += amount;
      } else if (action.payload.transactionType === 'expense') {
        state.balance -= amount;
        state.expense += amount;
      }
      const pages = Math.ceil(state.transactions.length / state.itemsPerPage);
      state.totalPages = pages;
      state.hasNext = state.currentPage < pages;
      state.hasPrevious = state.currentPage > 1;
    },

    deleteTransactions: (state, action) => {
      const transactionToDelete = state.transactions.find(
        transaction => transaction._id === action.payload
      );
      if (transactionToDelete) {
        const amount = Number(transactionToDelete.amount);
        if (transactionToDelete.transactionType === 'income') {
          state.balance -= amount;
          state.income -= amount;
        } else if (transactionToDelete.transactionType === 'expense') {
          state.balance += amount;
          state.expense -= amount;
        }
        state.transactions = state.transactions.filter(
          transaction => transaction._id !== action.payload
        );
        const pages = Math.ceil(state.transactions.length / state.itemsPerPage);
        state.totalPages = pages;
        state.hasNext = state.currentPage < pages;
        state.hasPrevious = state.currentPage > 1;
      }
    },

    updateTransactions: (state, action) => {
      const index = state.transactions.findIndex(
        transaction => transaction._id === action.payload._id
      );
      if (index !== -1) {
        const oldTransaction = state.transactions[index];
        const oldAmount = Number(oldTransaction.amount);
        const newAmount = Number(action.payload.amount);

        if (oldTransaction.transactionType === 'income') {
          state.balance -= oldAmount;
          state.income -= oldAmount;
        } else if (oldTransaction.transactionType === 'expense') {
          state.balance += oldAmount;
          state.expense -= oldAmount;
        }

        state.transactions[index] = action.payload;

        if (action.payload.transactionType === 'income') {
          state.balance += newAmount;
          state.income += newAmount;
        } else if (action.payload.transactionType === 'expense') {
          state.balance -= newAmount;
          state.expense += newAmount;
        }
      }
    },

    setInitialFinances: (state, action) => {
      const { balance, income, expense } = action.payload;
      state.balance = Number(balance);
      state.expense = Number(expense);
      state.income = Number(income);
    },

    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
      state.hasNext = action.payload < state.totalPages;
      state.hasPrevious = action.payload > 1;
    },

    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
      const pages = Math.ceil(state.transactions.length / action.payload);
      state.totalPages = pages;
      state.hasNext = state.currentPage < pages;
      state.hasPrevious = state.currentPage > 1;
    },

}

});

export const { setTransactions, addTransactions, deleteTransactions, updateTransactions, setInitialFinances, setCurrentPage, setItemsPerPage } = transactionSlice.actions;

export default transactionSlice.reducer;



