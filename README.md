# Acesso automático a parque estacionamento automóvel

Neste repositório encontra-se o desenvolvimento de uma aplicação que permite o acesso automático a um parque automóvel e também a sua interação com o mesmo.

### Instalação (Linux)

Instalação do openalpr na máquina:

```sh
# Install prerequisites
sudo apt-get install libopencv-dev libtesseract-dev git cmake build-essential libleptonica-dev
sudo apt-get install liblog4cplus-dev libcurl3-dev

# If using the daemon, install beanstalkd
sudo apt-get install beanstalkd

# Clone the latest code from GitHub
git clone https://github.com/openalpr/openalpr.git

# Setup the build directory
cd openalpr/src
mkdir build
cd build

# setup the compile environment
cmake -DCMAKE_INSTALL_PREFIX:PATH=/usr -DCMAKE_INSTALL_SYSCONFDIR:PATH=/etc ..

# compile the library
make

# Install the binaries/libraries to your local system (prefix is /usr)
sudo make install

# Test the library
wget http://plates.openalpr.com/h786poj.jpg -O lp.jpg
alpr lp.jpg
```

Source: [OpenALPR](http://doc.openalpr.com/opensource.html#compiling-openalpr)

Instalar/reinstalar o [Tesseract](https://github.com/tesseract-ocr/tesseract):

```sh
sudo add-apt-repository ppa:alex-p/tesseract-ocr -y
sudo apt-get update -y

#Reinstall tesseract
sudo apt-get purge libtesseract-dev
sudo apt-get install libtesseract-dev
```

Integrar o OpenALPR:

```sh
# Aceder a pasta do openalpr
cd openalpr/src/bindings/ptyhon

# Executar
python setup.py install --user
```

Source: [Python binding](https://github.com/openalpr/openalpr/wiki/Integrating-OpenALPR)

### Tecnologia

* [NodeJS](https://nodejs.org/en/) - Servidor.

* [OpenALPR](https://github.com/openalpr/openalpr) - Algoritmo de deteção de matrículas.

* [OpenCV](https://opencv.org/) - Deteção de imagem.

* [Raspberry Pi](https://www.raspberrypi.org/) - Mini computador a ser usado como base da aplicação.

### Desenvolvedor

* Jorge Oliveira - 8160579

### Orientador

* Altino Sampaio
