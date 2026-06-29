# 将本地仓库推送到 GitHub — 详细指南

本指南覆盖 **HTTPS** 和 **SSH** 两种方式，从零开始，每一步都列清楚。

---

## 前提条件

- 本地已有 Git 仓库（当前目录 `/Users/admin/Desktop/my-website`）
- GitHub 上已创建空仓库（假定仓库名为 `my-website`，用户名为 `your-username`）

> 如果你的仓库名或用户名不同，替换文中对应位置即可。

---

## 第一步：确保本地代码已提交

当前你的本地仓库还没有任何 commit，先把代码提交到本地：

```bash
# 添加所有文件
git add .

# 首次提交
git commit -m "Initial commit: my-website project"
```

---

# 方式一：HTTPS（推荐新手）

## 优点
- 设置简单，无需额外配置密钥
- 大多数网络环境都能用（不封 443 端口）
- 适合个人开发、少量仓库

## 缺点
- 每次 push 都需要输入 GitHub 用户名和密码（Token）

---

## 步骤 1：获取仓库 HTTPS 地址

在 GitHub 仓库页面，点击绿色的 **「<> Code」** 按钮 → 选择 **HTTPS** 标签 → 复制地址。

地址格式类似：
```
https://github.com/your-username/my-website.git
```

## 步骤 2：添加远程仓库

```bash
git remote add origin https://github.com/your-username/my-website.git
```

## 步骤 3：推送代码

```bash
# -u 表示将本地 main 分支与远程 origin/main 关联，之后只需 git push 即可
git push -u origin main
```

## 步骤 4：输入认证信息

推送时会提示输入用户名和密码：

- **Username**: 你的 GitHub 用户名
- **Password**: ⚠️ **不是** GitHub 登录密码！必须使用 **Personal Access Token (经典令牌)**

### 如何创建 Personal Access Token

1. 登录 GitHub → 右上角头像 → **Settings**
2. 左侧菜单 → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
3. 点击 **Generate new token (classic)**
4. Note 中填写一个标识名，例如 `my-website-push`
5. Expiration 选择有效期（可选 "No expiration"）
6. 勾选以下权限：
   - ✅ `repo`（完整的仓库读写权限 — 必选）
   - 如果仓库是私有的，还需要勾选 `repo` 下的所有子项
7. 点击页面底部 **Generate token**
8. **立即复制生成的 token**（`ghp_xxxxxxxxxxxx`）— 离开页面后就看不到了

> 之后推送时，Username 填 GitHub 用户名，Password 粘贴这个 token。

---

## 步骤 5：如果遇到 HTTPS 认证问题

如果提示 `Authentication failed`，可以更新 Git 凭据缓存：

```bash
# macOS 上使用 Keychain 存储凭据
git config --global credential.helper osxkeychain

# 下次推送会要求重新输入用户名+Token，之后自动缓存在 Keychain 中
```

---

# 方式二：SSH（推荐进阶/多仓库用户）

## 优点
- 配置一次，之后所有仓库 push/pull 都不需要输入密码
- 更安全（基于密钥对认证）
- 适合管理多个仓库、频繁推送

## 缺点
- 初次配置稍复杂（需要生成密钥、添加到 GitHub）
- 部分企业网络可能封锁 22 端口

---

## 步骤 1：检查是否已有 SSH 密钥

```bash
ls -la ~/.ssh
```

看是否存在 `id_ed25519` 和 `id_ed25519.pub`（或 `id_rsa` / `id_rsa.pub`）。

- **有？** → 跳到 步骤 3
- **没有？** → 继续 步骤 2

---

## 步骤 2：生成新的 SSH 密钥

```bash
# 推荐使用 ed25519 算法（更安全、更短）
ssh-keygen -t ed25519 -C "your-email@example.com"

# 或者兼容旧版，使用 RSA：
# ssh-keygen -t rsa -b 4096 -C "your-email@example.com"
```

运行后会问你三个问题：
- **保存路径**：直接回车（使用默认 `~/.ssh/id_ed25519`）
- **Passphrase**：可选（建议设置，多一层保护；或直接回车跳过）

---

## 步骤 3：复制公钥内容

```bash
cat ~/.ssh/id_ed25519.pub
# 如果是 RSA：
# cat ~/.ssh/id_rsa.pub
```

输出类似：
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI... your-email@example.com
```

**选中整行，复制到剪贴板。**

---

## 步骤 4：将公钥添加到 GitHub

1. 登录 GitHub → 右上角头像 → **Settings**
2. 左侧菜单 → **SSH and GPG keys**
3. 点击绿色按钮 **New SSH key**
4. Title：填写一个标识名，如 `My MacBook Pro`
5. Key type：保持 `Authentication Key`
6. Key：粘贴刚才复制的公钥内容
7. 点击 **Add SSH key**

---

## 步骤 5：测试 SSH 连接

```bash
ssh -T git@github.com
```

首次连接会提示确认主机指纹：
```
The authenticity of host 'github.com (140.82.121.4)' can't be established.
...
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

输入 `yes` 回车。

如果成功，会显示：
```
Hi your-username! You've successfully authenticated, but GitHub does not provide shell access.
```

---

## 步骤 6：获取仓库 SSH 地址

在 GitHub 仓库页面，点击绿色的 **「<> Code」** 按钮 → 选择 **SSH** 标签 → 复制地址。

地址格式类似：
```
git@github.com:your-username/my-website.git
```

## 步骤 7：添加远程仓库

```bash
git remote add origin git@github.com:your-username/my-website.git
```

## 步骤 8：推送代码

```bash
git push -u origin main
```

> 之后所有 push/pull 操作都不需要再输入密码，秒推！

---

## 步骤 9：如果 SSH 端口（22）被封锁

部分网络（如某些公司内网）会封 22 端口。GitHub 提供了备用方案——通过 HTTPS 端口 443 走 SSH：

编辑 `~/.ssh/config`：
```bash
nano ~/.ssh/config
```

添加：
```
Host github.com
    HostName ssh.github.com
    Port 443
    User git
```

保存后测试：
```bash
ssh -T git@github.com
```

成功显示 `Hi ...!` 即可正常推送。

---

# 两种方式快速对比

| 维度 | HTTPS | SSH |
|------|-------|-----|
| 初始配置 | 简单 | 需要生成密钥+添加 GitHub |
| 每次推送 | 需要输入 Token | 无需输入任何东西 |
| 安全性 | 基于 Token | 基于密钥对，更安全 |
| 网络兼容性 | 端口 443，通用 | 端口 22，部分网络需切换 443 |
| 适合场景 | 偶尔推送、单仓库 | 频繁推送、多仓库 |

---

# 常见问题

### Q: 已经用 HTTPS 设置了 remote，想切换到 SSH？

```bash
# 查看当前 remote
git remote -v

# 更改为 SSH 地址
git remote set-url origin git@github.com:your-username/my-website.git

# 验证
git remote -v
```

同样，从 SSH 切回 HTTPS 也是用 `set-url` 命令。

### Q: push 时提示 `remote origin already exists`？

说明 `origin` 已被占用：
```bash
# 方法一：直接用已存在的 origin
git remote set-url origin <新地址>

# 方法二：删掉旧的再添加
git remote remove origin
git remote add origin <新地址>
```

### Q: push 时提示 `main` 和远程有冲突？

如果远程仓库初始化时自动创建了 README/LICENSE 等文件：
```bash
# 先拉取远程内容并合并
git pull origin main --allow-unrelated-histories

# 解决冲突后再推送
git push -u origin main
```

### Q: 怎么查看是否推送成功？

```bash
# 查看远程分支
git branch -r

# 或者去 GitHub 仓库页面刷新查看
```

---

# 推荐选择

- **新手 / 偶尔用 / 快速搞完**：选 HTTPS，简单直接
- **经常用 Git / 管理多个仓库 / 嫌输密码麻烦**：选 SSH，一劳永逸
- **公司内网可能封端口**：HTTPS 最稳，或者 SSH + 端口 443 方案

> 我个人的建议是：花 3 分钟配好 SSH，以后每次 `git push` 都是一条命令搞定，非常爽。

---

*文档生成于 2026-06-29*
