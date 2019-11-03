# import math
import random

for i in range(10):
	for j in range(3):
		str = 'INSERT INTO space VALUES({}, {}, {}, {}, {}, {}, {}, {}, {}, {});'.format(random.randint(0, 10**5), 901073423, random.randint(200,400), 8, 8, 20, 1, 0, i, j)
		print(str)