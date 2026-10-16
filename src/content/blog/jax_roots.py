from jax import random
import jax
import jax.numpy as jnp
import os
import matplotlib.pyplot as plt
os.environ["XLA_PYTHON_CLIENT_PREALLOCATE"] = "false"

def polynomial_coeffs(a1,a2):
    return 100*jnp.array([1j*a2**3 + 1j*a2**2 +a2 -1j,0,0,0,0,-1j*a1**3 +1j*a1**2 +a1+1j])

def roots(a1,a2):
    coeffs = polynomial_coeffs(a1,a2)
    return jnp.roots(coeffs, strip_zeros=False)
# for quick visualizations
def random_complex(N,j=0):
        key = random.key(42+j)
        key2 = random.key(84+j)
        x=random.uniform(key, shape=(N,))
        y=random.uniform(key2, shape=(N,))
        z=x+1j*y
        return z/jnp.abs(z)

def complex_circle(N,r=1):
        theta=jnp.linspace(-jnp.pi,jnp.pi,N)
        return r*jnp.exp(1j*theta)

@jax.jit
def run_vectortized():
        z1 = complex_circle(501)
        z2 = complex_circle(501)
        vectorized_first_dim= lambda a1: jax.vmap(lambda a2: roots(a1, a2))(z2)
        result = jax.vmap(vectorized_first_dim)(z1)
        return result

def run_vectortized_no_jit(N):
        z1 = complex_circle(N)
        z2 = complex_circle(N)
        vectorized_first_dim= lambda a1: jax.vmap(lambda a2: roots(a1, a2))(z2)
        result = jax.vmap(vectorized_first_dim)(z1)
        return result
    

@jax.jit
def run():
        z1 = complex_circle(501)
        z2 = complex_circle(501)
        result=jnp.zeros((501,501))
        for i in range(501):
            for j in range(501):
                result[i,j] =roots(z1[i],z2[j])
        return result

def run_no_jit():
        z1 = complex_circle(501)
        z2 = complex_circle(501)
        result=jnp.zeros((501,501))
        for i in range(501):
            for j in range(501):
                result[i,j] =roots(z1[i],z2[j])
        return result
    