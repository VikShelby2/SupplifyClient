import React, { useState } from 'react'
import cn from 'classnames'
import styles from './Dropdown.module.sass'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Icon from '../../../ui/basics/Icon'

const Dropdown = ({ className, item, visibleSidebar, setValue, onClose }) => {
  const [visible, setVisible] = useState(false)

  const { pathname } = useLocation()

  const handleClick = () => {
    setVisible(!visible)
    setValue(true)
  }

  const Head = () => {
    return (
      <Link to={item.link}>
        <button
          className={cn(
            styles.head,
            {
              [styles.active]: pathname.includes(item.link),
            },
            { [styles.wide]: visibleSidebar }
          )}
          onClick={() => handleClick()}
        >
          <Icon name={item.icon} size="24" />
          {item.title}
          <Icon name="arrow-down" size="24" />
        </button>
      </Link>
    )
  }

  return (
    <div
      className={cn(
        styles.dropdown,
        className,
        { [styles.active]: visible },
        {
          [styles.active]: pathname.includes(item.slug),
        },
        { [styles.wide]: visibleSidebar }
      )}
    >
      {item.add ? (
        <div
          className={cn(styles.top, {
            [styles.active]: pathname.startsWith('/products/add'),
          })}
        >
          <Head />
          <Link
            className={cn(styles.add, {
              [styles.active]: pathname.startsWith('/products/add'),
            })}
            to="/products/add"
            onClick={onClose}
          >
            <Icon name="plus" size="10" />
          </Link>
        </div>
      ) : (
        <Head />
      )}
      <div className={styles.body}>
        {item.dropdown.map((x, index) => (
          <NavLink
            className={cn(styles.link, {
              [styles.active]: pathname === x.url,
            })}
            to={x.url}
            key={index}
            onClick={onClose}
          >
            {x.title}
            {x.counter ? (
              <div
                className={styles.counter}
                style={{ backgroundColor: x.colorCounter }}
              >
                {x.counter}
              </div>
            ) : (
              <Icon name="arrow-next" size="24" />
            )}
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default Dropdown
