# This is a math library, good for vector manipulation and linear algebra.
import numpy as np
# Plotting tool. This is good for data visualization in general,
# and will be invaluable when it comes to trying to figure out how well I'm doing.
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
import math
import pandas as pd
%matplotlib inline

# Opening the training set file
df_train = pd.read_csv('pricing_data/train.csv')

feature_list = ['LotArea', 'Street', 'Alley', 'YearBuilt', 'YrSold']
y_feature = 'SalePrice'

# Extract X, y
X_train = df_train[feature_list]
Y_train = df_train[y_feature]

# process features.
v = X_train['Street'].values
v = np.array([1 if i == 'Pave' else -1 for i in v])
X_train['street_type'] = v

v = X_train['Alley'].values
v = np.array([1 if i == 'Pave' else (-1 if i == 'Grvl' else 0) for i in v])
X_train['alley_type'] = v

# drop previous values.
X_train = X_train.drop(['Street', 'Alley'], axis=1)

x_l = list(X_train)
# perform feature crosses.
for ii,i in enumerate(list(x_l)):
    for jj,j in enumerate(list(x_l)):
        if jj >= ii:
            X_train[i + 'x' + j] = X_train[i].multiply(X_train[j])


X_train.head()
# Y_train.head()

from sklearn.linear_model import LinearRegression

res = LinearRegression().fit(X_train,Y_train)

sc = res.score(X_train,Y_train)


from joblib import dump, load
dump(res, 'anyware.model') 

print(sc)
