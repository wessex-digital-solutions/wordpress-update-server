# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.187.0/containers/typescript-node/.devcontainer/base.Dockerfile
# [Choice] Node.js version: 16, 14, 12
ARG VARIANT="16-buster"
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${VARIANT}

ARG USERNAME=vscode
ARG USER_UID=2000
ARG USER_GID=$USER_UID

# [Optional] Uncomment this section to install additional OS packages.
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y upgrade

# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# [Optional] Uncomment if you want to install more global node packages
RUN su node -c "npm install -g gitmoji-cli"

RUN sudo apt-get update && sudo apt-get install gnupg2 -y

# Create the user.
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME
    
USER $USERNAME
