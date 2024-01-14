FROM node

RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash - \
    && npm install -g npm \
    && npm install -g pnpm
