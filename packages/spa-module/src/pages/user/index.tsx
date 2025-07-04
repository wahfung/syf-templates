import React, { useState, useEffect } from 'react';
import { config } from '../../../configs/env';

// 类型定义
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
  createdAt: string;
}

interface CreateUserDto {
  name: string;
  email: string;
  age?: number;
}

interface UpdateUserDto {
  name?: string;
  email?: string;
  age?: number;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface ApiError {
  error: string;
}

// API 服务类
class UserApiService {
  private baseUrl = `${config.API_URL}/api`;

  async createUser(userData: CreateUserDto): Promise<ApiResponse<User>> {
    const response = await fetch(`${this.baseUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.error || '创建用户失败');
    }

    return response.json();
  }

  async getUsers(): Promise<ApiResponse<User[]>> {
    const response = await fetch(`${this.baseUrl}/users`);

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.error || '获取用户列表失败');
    }

    return response.json();
  }

  async getUserById(id: number): Promise<ApiResponse<User>> {
    const response = await fetch(`${this.baseUrl}/users/${id}`);

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.error || '获取用户失败');
    }

    return response.json();
  }

  async updateUser(id: number, userData: UpdateUserDto): Promise<ApiResponse<User>> {
    const response = await fetch(`${this.baseUrl}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.error || '更新用户失败');
    }

    return response.json();
  }

  async deleteUser(id: number): Promise<ApiResponse<{ message: string }>> {
    const response = await fetch(`${this.baseUrl}/users/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.error || '删除用户失败');
    }

    return response.json();
  }
}

// 创建用户表单组件
const CreateUserForm: React.FC<{
  onUserCreated: () => void;
  onStatusChange: (message: string, isError?: boolean) => void;
}> = ({ onUserCreated, onStatusChange }) => {
  const [formData, setFormData] = useState<CreateUserDto>({
    name: '',
    email: '',
    age: undefined,
  });
  const [loading, setLoading] = useState(false);

  const userApi = new UserApiService();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? (value ? parseInt(value) : undefined) : value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email) {
      onStatusChange('❌ 请填写必填字段', true);
      return;
    }

    setLoading(true);

    try {
      await userApi.createUser(formData);
      onStatusChange(`✅ 用户 "${formData.name}" 创建成功！`);
      setFormData({ name: '', email: '', age: undefined });
      onUserCreated();
    } catch (error) {
      onStatusChange(`❌ 创建失败：${error instanceof Error ? error.message : '未知错误'}`, true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg border">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">📝 创建用户</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">姓名 *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">邮箱 *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">年龄</label>
          <input
            type="number"
            name="age"
            value={formData.age || ''}
            onChange={handleInputChange}
            min="0"
            max="150"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? '创建中...' : '创建用户'}
        </button>
      </div>
    </div>
  );
};

// 用户列表项组件
const UserItem: React.FC<{
  user: User;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}> = ({ user, onEdit, onDelete }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center">
      <div className="flex-1">
        <div className="font-semibold text-gray-800">👤 {user.name}</div>
        <div className="text-gray-600 text-sm">📧 {user.email}</div>
        <div className="text-gray-500 text-xs">
          🎂 {user.age ? `${user.age} 岁` : '年龄未设置'} | ID: {user.id}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(user)}
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
        >
          编辑
        </button>
        <button
          onClick={() => onDelete(user)}
          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
        >
          删除
        </button>
      </div>
    </div>
  );
};

// 编辑用户模态框组件
const EditUserModal: React.FC<{
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: number, userData: UpdateUserDto) => Promise<void>;
}> = ({ user, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<UpdateUserDto>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        age: user.age,
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? (value ? parseInt(value) : undefined) : value,
    }));
  };

  const handleSubmit = async () => {
    if (!user || !formData.name || !formData.email) {
      return;
    }

    setLoading(true);
    try {
      await onSave(user.id, formData);
      onClose();
    } catch (error) {
      // 错误处理由父组件完成
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 max-w-90vw">
        <h3 className="text-lg font-semibold mb-4">编辑用户</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">年龄</label>
            <input
              type="number"
              name="age"
              value={formData.age || ''}
              onChange={handleInputChange}
              min="0"
              max="150"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              取消
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
            >
              {loading ? '保存中...' : '保存'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 状态消息组件
const StatusMessage: React.FC<{
  message: string;
  isError: boolean;
  onClose: () => void;
}> = ({ message, isError, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`p-4 rounded-lg border ${
        isError
          ? 'bg-red-50 text-red-700 border-red-200'
          : 'bg-green-50 text-green-700 border-green-200'
      }`}
    >
      {message}
    </div>
  );
};

// 主应用组件
const UserManagementApp: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState<{
    message: string;
    isError: boolean;
  } | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const userApi = new UserApiService();

  const showStatus = (message: string, isError: boolean = false) => {
    setStatusMessage({ message, isError });
  };

  const hideStatus = () => {
    setStatusMessage(null);
  };

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await userApi.getUsers();
      setUsers(response.data);
    } catch (error) {
      showStatus(
        `❌ 加载用户列表失败：${error instanceof Error ? error.message : '未知错误'}`,
        true,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveUser = async (id: number, userData: UpdateUserDto) => {
    try {
      await userApi.updateUser(id, userData);
      showStatus('✅ 用户更新成功！');
      await loadUsers();
    } catch (error) {
      showStatus(`❌ 更新失败：${error instanceof Error ? error.message : '未知错误'}`, true);
      throw error;
    }
  };

  const handleDeleteUser = async (user: User) => {
    if (!window.confirm(`确定要删除用户 "${user.name}" 吗？此操作不可恢复。`)) {
      return;
    }

    try {
      await userApi.deleteUser(user.id);
      showStatus(`✅ 用户 "${user.name}" 删除成功！`);
      await loadUsers();
    } catch (error) {
      showStatus(`❌ 删除失败：${error instanceof Error ? error.message : '未知错误'}`, true);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 p-4">
      <div className="max-w-4xl mx-auto">
        {/* 头部 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 text-center">
            <h1 className="text-2xl font-bold mb-2">👥 用户管理系统</h1>
            <p className="text-blue-100">基于 TypeScript + React + Prisma 读写分离</p>
          </div>

          <div className="p-6 space-y-6">
            {/* 状态消息 */}
            {statusMessage && (
              <StatusMessage
                message={statusMessage.message}
                isError={statusMessage.isError}
                onClose={hideStatus}
              />
            )}

            {/* 创建用户表单 */}
            <CreateUserForm onUserCreated={loadUsers} onStatusChange={showStatus} />

            {/* 用户列表 */}
            <div className="bg-gray-50 p-6 rounded-lg border">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-700">📖 用户列表</h2>
                <button
                  onClick={loadUsers}
                  disabled={loading}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:bg-gray-400 transition-colors"
                >
                  {loading ? '加载中...' : '刷新列表'}
                </button>
              </div>

              {loading ? (
                <div className="text-center py-8 text-gray-500">正在加载用户列表...</div>
              ) : users.length === 0 ? (
                <div className="text-center py-8 text-gray-500">🤷‍♂️ 暂无用户数据</div>
              ) : (
                <div className="space-y-3">
                  {users.map(user => (
                    <UserItem
                      key={user.id}
                      user={user}
                      onEdit={handleEditUser}
                      onDelete={handleDeleteUser}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 编辑用户模态框 */}
        <EditUserModal
          user={editingUser}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingUser(null);
          }}
          onSave={handleSaveUser}
        />
      </div>
    </div>
  );
};

export default UserManagementApp;
