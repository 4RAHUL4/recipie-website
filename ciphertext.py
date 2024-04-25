# def encrypt_caesar(plain_text, shift):
#     cipher_text = ""
#     for char in plain_text:
#         if char.isalpha():  
#             is_upper = char.isupper()
#             shifted_char = chr(((ord(char.lower()) - 97 + shift) % 26) + 97)
#             if is_upper:
#                 shifted_char = shifted_char.upper()
#             cipher_text += shifted_char
#         else:
#             cipher_text += char
#     return cipher_text

# if __name__ == "__main__":
#     plaintext = input("Enter the plain text: ")
#     shift_value = int(input("Enter the key value: "))

#     encrypted_text = encrypt_caesar(plaintext, shift_value)
#     print("Cipher text:", encrypted_text)
print("hello")
