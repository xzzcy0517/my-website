# 将本地仓库推送到 GitHub — 详细指南

我的实际操作流程：先在本地有项目 → 在 GitHub 创建空仓库 → 用 SSH 关联并推送。

---

## 前提条件

- 本地已有项目目录（比如 `/Users/admin/Desktop/my-website`），代码已经写好了
- 有一个 GitHub 账号

---

## 第 1 步：本地提交代码

先把本地代码提交到本地 Git 仓库：

```bash
cd /Users/admin/Desktop/my-website

# 初始化 Git 仓库（如果还没初始化）
git init

# 添加所有文件
git add .

# 首次提交
git commit -m "first commit"
```

---

## 第 2 步：在 GitHub 上创建空仓库

1. 登录 GitHub → 右上角 **+** → **New repository**
2. Repository name 填写 `my-website`（或你喜欢的名字）
3. 其他选项**全部留空**：
   - ❌ 不要勾选 "Add a README file"
   - ❌ 不要勾选 ".gitignore"
   - ❌ 不要勾选 "license"
   - 就是保持一个**完全空白的仓库**
4. 点击 **Create repository**

> ⚠️ 关键：一定要创建**空仓库**。如果仓库里有 README 等文件，后面推送会冲突，需要额外处理。

创建完成后，GitHub 会显示一个页面，里面有 SSH 地址，类似：
```
git@github.com:你的用户名/my-website.git
```

先复制这个地址。

---

## 第 3 步：配置 SSH 密钥

### 3.1 检查本地是否已有密钥

```bash
ls -la ~/.ssh
```

看有没有 `id_ed25519` 和 `id_ed25519.pub`。

- **有** → 跳到 3.3
- **没有** → 继续 3.2

### 3.2 生成新密钥

```bash
ssh-keygen -t ed25519 -C "mac book pro"
```

所有提示直接回车即可。

### 3.3 复制公钥

```bash
cat ~/.ssh/id_ed25519.pub
```

输出一整行 `ssh-ed25519 AAAA...` 开头的内容，**选中整行复制**。

### 3.4 把公钥添加到 GitHub

1. GitHub 右上角头像 → **Settings**
2. 左侧菜单 → **SSH and GPG keys**
3. 点击 **New SSH key**
4. Title：填写 `My MacBook Pro`（方便以后辨认）
5. Key：粘贴刚才复制的公钥
6. 点击 **Add SSH key**

### 3.5 测试连接

```bash
ssh -T git@github.com
```

首次会提示确认主机指纹，输入 `yes` 回车。看到 `Hi xxx! You've successfully authenticated...` 就说明成功了 ✅

---

## 第 4 步：关联远程仓库并推送

```bash
# 添加远程仓库（用第 2 步复制的 SSH 地址）
git remote add origin git@github.com:你的用户名/my-website.git

# 推送代码，-u 让本地 main 和远程 main 绑定，以后直接 git push 即可
git push -u origin main
```

推送成功后，刷新 GitHub 仓库页面，代码就全部在上面了。

---

## 常见问题

### Q: push 时提示 `remote origin already exists`？

说明 `origin` 已被占用：
```bash
# 改成正确的地址
git remote set-url origin git@github.com:你的用户名/my-website.git
```

### Q: push 时提示 `main` 和远程有冲突？

说明远程仓库不是空的（可能创建时勾选了 README 等文件）：
```bash
# 先拉取远程内容并合并
git pull origin main --allow-unrelated-histories

# 解决冲突后再推送
git push -u origin main
```

### Q: 推送时要输密码？

说明 `git remote add` 时用了 HTTPS 地址，改成 SSH 即可：
```bash
git remote set-url origin git@github.com:你的用户名/my-website.git
```

---

## 附录：SSH 密钥泄露后如何重建

如果你的本地 SSH 密钥已经泄露（比如不小心把私钥发给了别人、密钥出现在了公开仓库中），需要立即更换。

### 第一步：在 GitHub 上删除旧公钥

1. 登录 GitHub → 右上角头像 → **Settings**
2. 左侧菜单 → **SSH and GPG keys**
3. 找到你本地电脑对应的密钥（Title 为「My MacBook Pro」或你当时取的名字）
4. 点击右侧的 **Delete** → 确认删除

> ⚠️ 这一步最关键——先废掉旧公钥，这样即使别人有你的旧私钥也无法访问你的仓库。

### 第二步：在本地删除旧密钥

```bash
rm -f ~/.ssh/id_ed25519 ~/.ssh/id_ed25519.pub

# 如果用的是 RSA 密钥：
# rm -f ~/.ssh/id_rsa ~/.ssh/id_rsa.pub
```

### 第三步：生成新密钥

```bash
ssh-keygen -t ed25519 -C "mac book pro"
```

所有提示直接回车。

### 第四步：把新公钥添加到 GitHub

```bash
cat ~/.ssh/id_ed25519.pub
```

复制输出内容 → GitHub → Settings → SSH and GPG keys → New SSH key → 粘贴 → Add SSH key。

### 第五步：测试

```bash
ssh -T git@github.com
# 看到 Hi xxx! You've successfully authenticated... → 成功

cd /Users/admin/Desktop/my-website
git pull   # 验证拉取正常
git push   # 验证推送正常
```

### 第六步（可选）：同步更新阿里云服务器上的密钥

服务器上的密钥是**独立的一对**，也需要同步更换。参考 [阿里云服务器部署指南 - 附录](./阿里云服务器部署指南.md#附录ssh-密钥泄露后如何重建)。

### 安全建议

- 私钥文件（`id_ed25519`，不带 `.pub` 后缀）**永远不要**发给任何人、不要上传到任何地方
- 建议给私钥设置 passphrase（生成时输入密码），这样即使文件泄露，对方没有密码也无法使用
- 定期检查 GitHub 的 [SSH keys 页面](https://github.com/settings/keys)，清理不再使用的旧密钥
