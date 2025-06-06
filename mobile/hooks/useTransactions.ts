// react custom hook file

import { API_URL } from "@/constants/api";
import { TransactionType } from "@/types/transactions.types"
import { useCallback, useState } from "react"
import { Alert } from "react-native";


export const useTransactions = (userId: string) => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  //useCallback is used for performance reasons, it will memoize the function
  const fetchTransactions = useCallback(async () => {
    try {

      const response = await fetch(`${API_URL}/transactions/${userId}`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);

    }
  }, [userId]);

  const fetchSummary = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/summary/${userId}`);
      const data = await response.json();
      setSummary(data)
    } catch (error) {
      console.error("Error fetching summary:", error);

    }
  }, [userId]);

  const loadData = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      // Can be run in parallel
      await Promise.all([fetchTransactions(), fetchSummary()]);
    } catch (error) {
      console.error("Error loading data:", error);

    } finally {
      setIsLoading(false)
    }
  }, [fetchTransactions, fetchSummary, userId]);

  const deleteTransaction = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/transactions/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete transaction");

      //Refresh data after deletion
      loadData();
      Alert.alert("Success", "Transaction deleted successfully");
    } catch (error: any) {
      console.error("Error deleting transaction:", error);
      Alert.alert("Error", error.message);

    }
  }
  return { transactions, summary, isLoading, loadData, deleteTransaction }
}