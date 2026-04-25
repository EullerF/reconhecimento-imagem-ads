from typing import List, Tuple

def calculate_statistics(numbers: List[float]) -> Tuple[float, float, float, float]:
    """
    Calcula estatísticas básicas de uma lista de números.

    Args:
        numbers (List[float]): Lista de números para calcular estatísticas.

    Returns:
        Tuple[float, float, float, float]: Tupla contendo (total, média, máximo, mínimo).

    Raises:
        ValueError: Se a lista estiver vazia.

    Examples:
        >>> calculate_statistics([1, 2, 3, 4, 5])
        (15, 3.0, 5, 1)
    """
    if not numbers:
        raise ValueError("A lista não pode estar vazia")
    
    total = sum(numbers)
    average = total / len(numbers)
    maximum = max(numbers)
    minimum = min(numbers)
    
    return total, average, maximum, minimum

def main() -> None:
    """Função principal para demonstrar o cálculo de estatísticas."""
    data = [23, 7, 45, 2, 67, 12, 89, 34, 56, 11]
    total, average, maximum, minimum = calculate_statistics(data)
    
    print(f"Total: {total}")
    print(f"Média: {average}")
    print(f"Maior: {maximum}")
    print(f"Menor: {minimum}")

if __name__ == "__main__":
    main()