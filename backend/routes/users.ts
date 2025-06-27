import { Router, Request, Response } from 'express';
import usersData from '../data/users.json';

const users = usersData.users;

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json(users);
});

router.post('/login', (req, res) => {
  const { name, password } = req.body;
  const user = users.find(u => u.name === name && u.password === password);

  if (!user) {
    res.status(401).json({ message: 'Пользователь не найден' });
    res.end()
    return
  }


  res.json({ name: user.name, role: user.role });
});

export default router;
