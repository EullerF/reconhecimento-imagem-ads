from typing import List

def is_prime(number: int) -> bool:
    """
    Verifica se um número é primo.

    Um número primo é um número natural maior que 1 que não tem
    divisores positivos além de 1 e ele mesmo.

    Args:
        number (int): O número a ser verificado. Deve ser um inteiro não negativo.

    Returns:
        bool: True se o número for primo, False caso contrário.

    Raises:
        ValueError: Se o número for negativo.

    Examples:
        >>> is_prime(2)
        True
        >>> is_prime(4)
        False
    """
    if number < 0:
        raise ValueError("Número deve ser não negativo")
    
    if number <= 1:
        return False
    
    if number == 2:
        return True
    
    if number % 2 == 0:
        return False
    
    # Verifica divisibilidade por números ímpares até a raiz quadrada
    max_divisor = int(number ** 0.5) + 1
    for divisor in range(3, max_divisor, 2):
        if number % divisor == 0:
            return False
    
    return True

def main() -> None:
    """Função principal para testar a função is_prime."""
    test_numbers: List[int] = [2, 3, 4, 5, 10, 17, 20, 29, 30]
    
    for num in test_numbers:
        result = is_prime(num)
        print(f"{num} é primo? {result}")

if __name__ == "__main__":
    main()
