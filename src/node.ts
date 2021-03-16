export type NodeId = string
export type Path = Array<NodeId>

type Node<A> = {
  id: NodeId,
  children: Array<A>
}

export type Tree<A, B> = Root<A, B> | Branch<B>

export interface Root<A, B> extends Node<Branch<B>> {
  data: A
}

export interface Branch<A> extends Node<Branch<A>> {
  data: A
}

export function climb<A, B>(trees: Array<Tree<A, B>>, path: Path): Tree<A, B> | undefined {

  let [id, ...rest] = path;

  let tree = trees.find(_ => _.id == id);

  if (tree && rest.length > 0) {
    return climb(tree.children, rest);
  }
  return tree;
}

export function root<A, B>(id: NodeId, a: A): Root<A, B> {
  return {
    id,
    data: a,
    children: []
  }
}

export function add<A, B>(id: NodeId, root: Root<A, B>, path: Path, data: B): Tree<A, B> | undefined {
  let branch = path.length === 0 ? root : climb(root.children, path);

  if (branch) {
    branch.children.push({
      id,
      data,
      children: []
    });
    return root;
  }
}

export function mainlineNodeList<A>(node: Branch<A>): Array<Branch<A>>;
export function mainlineNodeList<A, B>(root: Root<A, B>): Array<Root<A, B> | Branch<B>> {
  return [{
    ...root,
    children: root.children.slice(1)
  }, ...root.children[0] ?
    mainlineNodeList(root.children[0]) : []];
}
