import { Router, Request, Response } from 'express';
import eventsData from '../data/events.json';

const events = eventsData.events;

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json(events);
});

router.patch('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const event = events.find(e => e.id === Number(id));
  if (!event) {
    return res.status(404);
  }

  event.status = status;
  res.json(event);
});

router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = events.findIndex(e => e.id === Number(id));

  if (index === -1) {
    return res.status(404);
  }

  const deleted = events.splice(index, 1)[0];
  res.json(deleted);
});

router.post('/new_order', (req: Request, res: Response) => {
  const { name, address, date, status, comment } = req.body;

  if (!name || !address || !date || !status) {
    return res.status(400);
  }

  const newEvent = {
    id: Date.now(),
    name,
    address,
    date,
    status,
    comment: comment || ''
  };

  events.push(newEvent);

  res.status(201).json(newEvent);
});


export default router;
